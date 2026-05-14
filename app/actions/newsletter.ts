"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Resend } from "resend";
import { newsletterSchema } from "@/lib/validation/schemas";
import { getTranslations } from "@/lib/i18n/translations";
import { renderNewsletterWelcomeHtml, renderNewPostHtml } from "@/lib/emails/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeNewsletter(formData: FormData) {
  try {
    const raw = { email: formData.get("email") };
    const recaptchaToken = formData.get("recaptchaToken") as string | null;
    const lang = (formData.get("lang") as string) || "en";

    const t = getTranslations(lang);
    const isDevelopment = process.env.NODE_ENV === "development";

    // 1. Validar con Zod
    const parsed = newsletterSchema.safeParse(raw);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid email.";
      return { success: false, error: firstError };
    }

    const { email } = parsed.data;

    // 2. Validar reCAPTCHA (Solo en Producción)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!isDevelopment) {
      if (!recaptchaToken || !secretKey) {
        return { success: false, error: "Security validation unavailable. Please reload." };
      }

      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return { success: false, error: "Security validation failed. Please try again." };
      }
    }

    // 3. Comprobar si el email ya existe
    const subscribersRef = adminDb.collection("subscribers");
    const existing = await subscribersRef.where("email", "==", email).get();

    if (!existing.empty) {
      return { success: false, error: lang === "es" ? "Este correo ya está suscrito." : "This email is already subscribed." };
    }

    // 4. Guardar en Firestore
    await subscribersRef.add({
      email,
      lang,
      createdAt: new Date(),
      status: "active",
    });

    // 5. Enviar correo de bienvenida usando el template HTML independiente y los textos localizados
    const senderEmail = process.env.RESEND_SENDER_EMAIL || "hola@camilopinzon.com";

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `Camilo Pinzón <${senderEmail}>`,
        to: email,
        subject: t.emails.newsletterSubject,
        html: renderNewsletterWelcomeHtml({
          greeting: t.emails.newsletterGreeting,
          thanks: t.emails.newsletterThanks,
          followUp: t.emails.newsletterFollowUp,
          signOff: t.emails.newsletterSignOff,
        }),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: "Unexpected error occurred." };
  }
}

interface PostFormData {
  title?: string;
  slug?: string;
  translations?: Record<string, {
    title?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

export async function notifySubscribersAboutNewPostAction(formData: PostFormData) {
  try {
    const subscribersRef = adminDb.collection("subscribers");
    const snapshot = await subscribersRef.where("status", "==", "active").get();
    
    const senderEmail = process.env.RESEND_SENDER_EMAIL || "hola@camilopinzon.com";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://camilopinzon.com";

    const emailsToSend: { to: string; lang: string }[] = [];

    // Add test email if it's not already in the list
    emailsToSend.push({
      to: "pinzonac@gmail.com",
      lang: "es" 
    });

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.email && data.email !== "pinzonac@gmail.com") {
        emailsToSend.push({
          to: data.email,
          lang: data.lang || "es"
        });
      }
    });

    if (process.env.RESEND_API_KEY) {
      // resend.batch.send could be used, but loop is simple and allows localization per user
      for (const sub of emailsToSend) {
        const t = getTranslations(sub.lang);
        const localizedTitle = formData.translations?.[sub.lang]?.title || formData.title || "Nuevo Artículo";
        const subject = t.emails.newPostSubject ? t.emails.newPostSubject.replace("{title}", localizedTitle) : `Nuevo Artículo: ${localizedTitle}`;
        const message = t.emails.newPostMessage ? t.emails.newPostMessage.replace("{title}", localizedTitle) : `Acabo de publicar un nuevo artículo: ${localizedTitle}`;
        
        const postUrl = `${siteUrl}/${sub.lang}/blog/${formData.slug || ''}`;
        const unsubscribeUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(sub.to)}`;

        await resend.emails.send({
          from: `Camilo Pinzón <${senderEmail}>`,
          to: sub.to,
          subject: subject,
          html: renderNewPostHtml({
            greeting: t.emails.newPostGreeting || "¡Hola!",
            message: message,
            ctaText: t.emails.newPostCta || "Leer el artículo",
            postUrl: postUrl,
            signOff: t.emails.newsletterSignOff || "Un saludo,",
            unsubscribeText: t.emails.unsubscribe || "Darse de baja",
            unsubscribeUrl: unsubscribeUrl,
          }),
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error notifying subscribers:", error);
    return { success: false, error: "Unexpected error occurred." };
  }
}
