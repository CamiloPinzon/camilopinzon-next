'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cmsConfig } from '@/lib/cms/config';
import styles from './language-switcher.module.scss';

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
    <div className={styles.pillSwitcher}>
      {cmsConfig.languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`${styles.pillItem} ${currentLang === lang.code ? styles.active : ''}`}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
