import React from 'react';
import Link from 'next/link';
import { cmsConfig } from '@/lib/cms/config';
import '../admin.scss'; // We'll create this later
import LogoutButton from './logout-button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>CMS Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-item">Dashboard</Link>
          <div className="admin-nav-group">Collections</div>
          {cmsConfig.collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/admin/collections/${collection.id}`} 
              className="admin-nav-item"
            >
              {collection.name}
            </Link>
          ))}
          <div className="admin-nav-group">Settings</div>
          <Link href="/admin/settings" className="admin-nav-item">Site Settings</Link>
          <Link href="/admin/migrate" className="admin-nav-item" style={{ color: '#ff9500' }}>Migration Tool</Link>
          <Link href="/admin/merge-tool" className="admin-nav-item" style={{ color: '#ff3b30' }}>Merge Tool</Link>
        </nav>
      </aside>
      <main className="admin-main-content">
        <header className="admin-topbar">
          <div className="admin-topbar-title">Dashboard</div>
          <div className="admin-topbar-user">
            <LogoutButton />
          </div>
        </header>
        <div className="admin-content-area">
          {children}
        </div>
      </main>
    </div>
  );
}
