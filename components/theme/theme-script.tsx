import React from 'react';

export const ThemeScript = () => {
  const code = `
    (function() {
      try {
        var mode = localStorage.getItem('theme-mode') || 'dynamic';
        var progress = 0;
        
        if (mode === 'dark') {
          progress = 1;
        } else if (mode === 'light') {
          progress = 0;
        } else {
          // Dynamic mode: Calculate based on time
          var now = new Date();
          var hours = now.getHours() + now.getMinutes() / 60;
          
          // Using a cosine wave where 12 PM (noon) is 0 (pure light) and 12 AM (midnight) is 1 (pure dark).
          progress = (Math.cos((hours / 24) * 2 * Math.PI) + 1) / 2;
        }
        
        document.documentElement.style.setProperty('--theme-progress', progress);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
};
