'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import Button from '@/components/ui/button/button';

export default function MigrateSubscribersPage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  const handleMigration = async () => {
    if (!confirm('This will move all data from "newsletter" to "subscribers". Continue?')) return;
    
    setStatus('running');
    setError('');
    
    try {
      // 1. Fetch from old collection
      const oldSnap = await getDocs(collection(db, 'newsletter'));
      const oldDocs = oldSnap.docs;
      
      let migrated = 0;
      
      for (const oldDoc of oldDocs) {
        const data = oldDoc.data();
        const email = data.email || data.correo || oldDoc.id; // Try common fields or ID
        
        if (email && email.includes('@')) {
          // 2. Add to new collection
          await addDoc(collection(db, 'subscribers'), {
            email: email.toLowerCase(),
            languagePref: 'es', // Default to ES for existing users
            subscribedAt: data.subscribedAt || data.fecha || serverTimestamp(),
            source: 'migration'
          });
          
          // 3. Delete from old collection (to make it a "move")
          await deleteDoc(doc(db, 'newsletter', oldDoc.id));
          migrated++;
        }
      }
      
      setCount(migrated);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Newsletter Migration Tool</h1>
      <p>This tool moves subscribers from the legacy <strong>newsletter</strong> collection to the new <strong>subscribers</strong> collection.</p>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        {status === 'idle' && (
          <Button onClick={handleMigration}>Start Migration</Button>
        )}
        
        {status === 'running' && <p>Migrating... Please wait.</p>}
        
        {status === 'success' && (
          <div style={{ color: 'green' }}>
            <p><strong>Success!</strong> Migrated {count} subscribers.</p>
            <Button onClick={() => setStatus('idle')}>Migrate More</Button>
          </div>
        )}
        
        {status === 'error' && (
          <div style={{ color: 'red' }}>
            <p><strong>Error:</strong> {error}</p>
            <Button onClick={() => setStatus('idle')}>Try Again</Button>
          </div>
        )}
      </div>
    </div>
  );
}
