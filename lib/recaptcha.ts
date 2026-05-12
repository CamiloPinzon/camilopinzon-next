/**
 * Ejecuta reCAPTCHA v3 usando la API nativa de window.grecaptcha.
 * Espera hasta 5s a que el script esté inicializado antes de retornar null.
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export async function executeRecaptcha(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey || typeof window === "undefined") return null;

  // Espera hasta 5s a que window.grecaptcha esté disponible
  const waitForGrecaptcha = (): Promise<typeof window.grecaptcha> =>
    new Promise((resolve) => {
      const maxWait = 5000;
      const interval = 100;
      let elapsed = 0;

      const check = () => {
        if (window.grecaptcha?.ready) {
          resolve(window.grecaptcha);
        } else if (elapsed >= maxWait) {
          resolve(undefined);
        } else {
          elapsed += interval;
          setTimeout(check, interval);
        }
      };

      check();
    });

  const g = await waitForGrecaptcha();

  if (!g) return null;

  return new Promise((resolve) => {
    g.ready(async () => {
      try {
        const token = await g.execute(siteKey, { action });
        resolve(token);
      } catch {
        resolve(null);
      }
    });
  });
}
