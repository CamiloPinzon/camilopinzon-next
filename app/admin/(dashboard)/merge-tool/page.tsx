'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/config';

interface BasicPost {
  id: string;
  title: string;
}

export default function MergeToolPage() {
  const [posts, setPosts] = useState<BasicPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [merging, setMerging] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const [basePostId, setBasePostId] = useState<string>('');
  const [secondaryPostId, setSecondaryPostId] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('es');

  const log = (msg: string) => setLogs(prev => [...prev, msg]);

  const fetchPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = snapshot.docs.map(d => {
        const data = d.data();
        // Since the migration script put everything in 'en', we read from there for the title
        const title = data.translations?.en?.title || 'Untitled';
        return { id: d.id, title };
      });
      // Sort alphabetically for easier finding
      fetchedPosts.sort((a, b) => a.title.localeCompare(b.title));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleMerge = async () => {
    if (!basePostId || !secondaryPostId) {
      alert("Please select both a Base Post and a Secondary Post to merge.");
      return;
    }
    if (basePostId === secondaryPostId) {
      alert("You cannot merge a post into itself!");
      return;
    }

    setMerging(true);
    setLogs([]);
    log('Auth Check...');
    
    if (!auth.currentUser) {
      log('❌ ERROR: You are not logged in according to Firebase. Please refresh and log in.');
      setMerging(false);
      return;
    }
    
    log(`✅ Logged in as: ${auth.currentUser.email}`);
    log(`Starting merge: [${secondaryPostId}] -> [${basePostId}] as '${targetLanguage}'...`);

    try {
      // 1. Fetch both documents
      const baseRef = doc(db, 'posts', basePostId);
      const secRef = doc(db, 'posts', secondaryPostId);

      const baseSnap = await getDoc(baseRef);
      const secSnap = await getDoc(secRef);

      if (!baseSnap.exists() || !secSnap.exists()) {
        throw new Error("One or both documents do not exist.");
      }

      const baseData = baseSnap.data();
      const secData = secSnap.data();

      // 2. Extract the content from the secondary post
      // (The migration script placed the legacy data into translations.en)
      const secContent = secData.translations?.en || {};

      // 3. Prepare the updated translations object for the base post
      const updatedTranslations = {
        ...baseData.translations,
        [targetLanguage]: {
          ...secContent,
        }
      };

      // 4. Update the base post
      await updateDoc(baseRef, {
        translations: updatedTranslations
      });
      log(`✅ Successfully injected content into Base Post under language '${targetLanguage}'.`);

      // 5. Delete the secondary post
      await deleteDoc(secRef);
      log(`✅ Successfully deleted the duplicate Secondary Post.`);

      log('🎉 Merge completed successfully!');

      // Refresh the lists and reset selection
      setBasePostId('');
      setSecondaryPostId('');
      await fetchPosts();

    } catch (error: any) {
      console.error(error);
      log(`❌ Error during merge: ${error.message}`);
    } finally {
      setMerging(false);
    }
  };

  if (loading) return <div style={{ padding: '32px' }}>Loading posts...</div>;

  return (
    <div style={{ padding: '32px', backgroundColor: 'white', borderRadius: '16px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#2b3674' }}>Bilingual Post Merge Tool</h1>
      <p style={{ color: '#a3aed1', marginBottom: '32px' }}>
        Select two posts to combine. The content from the <strong>Secondary Post</strong> will be moved into the <strong>Base Post</strong> under the selected language tag. The Secondary Post will then be permanently deleted.
      </p>

      <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
        {/* BASE POST */}
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 600, color: '#2b3674', marginBottom: '8px' }}>
            1. Select Base Post (Keep this one)
          </label>
          <select 
            value={basePostId} 
            onChange={(e) => setBasePostId(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e0e5f2' }}
          >
            <option value="">-- Select Post --</option>
            {posts.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>

        {/* SECONDARY POST */}
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 600, color: '#2b3674', marginBottom: '8px' }}>
            2. Select Secondary Post (Will be deleted)
          </label>
          <select 
            value={secondaryPostId} 
            onChange={(e) => setSecondaryPostId(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e0e5f2' }}
          >
            <option value="">-- Select Post --</option>
            {posts.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#2b3674', marginBottom: '8px' }}>
          3. What language is the Secondary Post written in?
        </label>
        <select 
          value={targetLanguage} 
          onChange={(e) => setTargetLanguage(e.target.value)}
          style={{ width: '200px', padding: '12px', borderRadius: '8px', border: '1px solid #e0e5f2' }}
        >
          <option value="es">Spanish (es)</option>
          <option value="en">English (en)</option>
        </select>
      </div>

      <button 
        onClick={handleMerge}
        disabled={merging}
        style={{
          backgroundColor: '#ff3b30', // Red to indicate destructive action
          color: 'white',
          padding: '12px 32px',
          borderRadius: '12px',
          border: 'none',
          fontWeight: 700,
          cursor: merging ? 'not-allowed' : 'pointer',
          opacity: merging ? 0.7 : 1
        }}
      >
        {merging ? 'Merging...' : 'Merge & Delete Duplicate'}
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
