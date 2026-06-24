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
          var now = new Date();
          var h = now.getHours() + now.getMinutes() / 60;

          // 1.5-hour windows: worst-case midpoint falls between whole hours,
          // keeping WCAG AA contrast (≥4.5:1) at all practical times.
          // Day 07:30–19:00 → light. Night 20:30–06:00 → dark.
          function smoothstep(x) { return x * x * (3 - 2 * x); }

          if (h >= 7.5 && h < 19) {
            progress = 0;
          } else if (h >= 20.5 || h < 6) {
            progress = 1;
          } else if (h >= 6 && h < 7.5) {
            progress = 1 - smoothstep((h - 6) / 1.5);
          } else {
            progress = smoothstep((h - 19) / 1.5);
          }
        }

        document.documentElement.style.setProperty('--theme-progress', progress);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
};
