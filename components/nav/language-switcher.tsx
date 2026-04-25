'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cmsConfig } from '@/lib/cms/config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || cmsConfig.defaultLanguage;
  
  // Exclude admin routes
  if (pathname.startsWith('/admin')) return null;

  const handleLanguageChange = (newLang: string) => {
    if (newLang === currentLang) return;
    
    // Construct new path
    const segments = pathname.split('/');
    segments[1] = newLang; // Replace the language segment
    const newPath = segments.join('/') || '/';
    
    router.push(newPath);
  };

  return (
    <div className="language-switcher" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {cmsConfig.languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: currentLang === lang.code ? 700 : 400,
            color: currentLang === lang.code ? '#4318ff' : '#a3aed1',
            backgroundColor: currentLang === lang.code ? '#eef2ff' : 'transparent',
            transition: 'all 0.2s ease'
          }}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
