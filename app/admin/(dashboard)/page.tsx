import React from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default async function AdminDashboard() {
  // Fetch actual counts from Firestore using client SDK
  let postsCount = 0;
  let projectsCount = 0;

  try {
    const [postsSnapshot, projectsSnapshot] = await Promise.all([
      getCountFromServer(collection(db, 'posts')),
      getCountFromServer(collection(db, 'projects'))
    ]);
    
    postsCount = postsSnapshot.data().count;
    projectsCount = projectsSnapshot.data().count;
  } catch (error) {
    console.error("Failed to fetch collection counts:", error);
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Welcome to the Admin Dashboard</h1>
      <p style={{ color: '#707eae' }}>
        This is your custom, flexible CMS powered by Firebase. From here, you can manage all your collections dynamically.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(112, 144, 176, 0.08)' }}>
          <h3 style={{ color: '#a3aed1', fontSize: '0.875rem', textTransform: 'uppercase' }}>Total Posts</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#2b3674', marginTop: '8px' }}>{postsCount}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(112, 144, 176, 0.08)' }}>
          <h3 style={{ color: '#a3aed1', fontSize: '0.875rem', textTransform: 'uppercase' }}>Total Projects</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#2b3674', marginTop: '8px' }}>{projectsCount}</p>
        </div>
      </div>
    </div>
  );
}
