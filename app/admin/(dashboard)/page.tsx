import React from 'react';
import { adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch actual counts from Firestore using Admin SDK
  let postsCount = 0;
  let projectsCount = 0;
  let newsCount = 0;

  try {
    const [postsSnapshot, projectsSnapshot, newsSnapshot] = await Promise.all([
      adminDb.collection('posts').count().get(),
      adminDb.collection('projects').count().get(),
      adminDb.collection('news').count().get()
    ]);
    
    postsCount = postsSnapshot.data().count;
    projectsCount = projectsSnapshot.data().count;
    newsCount = newsSnapshot.data().count;
  } catch (error) {
    console.error("Failed to fetch collection counts:", error);
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Welcome to the Admin Dashboard</h1>
      <p style={{ color: '#707eae' }}>
        This is your custom, flexible CMS powered by Firebase. From here, you can manage all your collections dynamically.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(112, 144, 176, 0.08)' }}>
          <h3 style={{ color: '#a3aed1', fontSize: '0.875rem', textTransform: 'uppercase' }}>Total Posts</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#2b3674', marginTop: '8px' }}>{postsCount}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(112, 144, 176, 0.08)' }}>
          <h3 style={{ color: '#a3aed1', fontSize: '0.875rem', textTransform: 'uppercase' }}>Total Projects</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#2b3674', marginTop: '8px' }}>{projectsCount}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(112, 144, 176, 0.08)' }}>
          <h3 style={{ color: '#a3aed1', fontSize: '0.875rem', textTransform: 'uppercase' }}>Total News</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#2b3674', marginTop: '8px' }}>{newsCount}</p>
        </div>
      </div>
    </div>
  );
}
