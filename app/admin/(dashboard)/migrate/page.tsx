'use client';

import React, { useState } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function MigratePage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const log = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleMigration = async () => {
    setLoading(true);
    setLogs([]);
    
    // Auth Check
    const { auth } = await import('@/lib/firebase/config');
    const user = auth.currentUser;
    if (!user) {
      log('❌ ERROR: You are NOT logged in according to Firebase. Please click Logout and sign in again.');
      setLoading(false);
      return;
    }

    log(`✅ Verified logged in as: ${user.email}`);
    log('Starting migration from "blogs" to "posts"...');

    try {
      const blogsSnapshot = await getDocs(collection(db, 'blogs'));
      log(`Found ${blogsSnapshot.docs.length} documents in "blogs" collection.`);

      for (const blogDoc of blogsSnapshot.docs) {
        const data = blogDoc.data();
        
        // Map the legacy flat fields into the new translation schema
        const migratedData = {
          // If you want to keep the original ID or generate a slug:
          slug: data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : blogDoc.id,
          coverImage: data.coverImage || data.image || '', // Fallbacks
          publishedAt: data.createdAt || data.date || new Date().toISOString(),
          isPublished: true,
          // IMPORTANT: Convert the flat structure into our new multilingual schema
          translations: {
            en: {
              title: data.title || 'Untitled Blog Post',
              excerpt: data.excerpt || data.description || '',
              content: data.content || '',
            }
          },
          // Keep the original author data
          author: data.author || null,
        };

        // Save to the new 'posts' collection using the exact same document ID
        await setDoc(doc(db, 'posts', blogDoc.id), migratedData);
        log(`Successfully migrated: ${blogDoc.id}`);
      }

      log('✅ Migration completed successfully!');
    } catch (error: any) {
      console.error(error);
      log(`❌ Error during migration: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: 'white', borderRadius: '16px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Data Migration Tool</h1>
      <p style={{ color: '#a3aed1', marginBottom: '24px' }}>
        This script copies all articles from the legacy <strong>`blogs`</strong> collection and reformats them 
        into the new multilingual <strong>`posts`</strong> collection schema.
      </p>

      <button 
        onClick={handleMigration}
        disabled={loading}
        style={{
          backgroundColor: '#4318ff',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          border: 'none',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Migrating...' : 'Start Migration'}
      </button>

      {logs.length > 0 && (
        <div style={{ marginTop: '32px', backgroundColor: '#f4f7fe', padding: '16px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.875rem', maxHeight: '400px', overflowY: 'auto' }}>
          {logs.map((msg, i) => (
            <div key={i} style={{ marginBottom: '8px', color: msg.includes('❌') ? '#ff3b30' : msg.includes('✅') ? '#34c759' : '#2b3674' }}>
              {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
