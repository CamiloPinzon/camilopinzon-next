/**
 * Ejecuta reCAPTCHA v3 usando la API nativa de window.grecaptcha.
 * Retorna el token o null si reCAPTCHA no está disponible.
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey || typeof window === "undefined") return null;

  return new Promise((resolve) => {
    const g = (window as Window & { grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } }).grecaptcha;

    if (!g) {
      resolve(null);
      return;
    }

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
