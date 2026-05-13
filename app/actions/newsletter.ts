"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Resend } from "resend";
import { newsletterSchema } from "@/lib/validation/schemas";
import { getTranslations } from "@/lib/i18n/translations";

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

    // 5. Enviar correo de bienvenida localizado desde el diccionario
    const senderEmail = process.env.RESEND_SENDER_EMAIL || "hola@camilopinzon.com";

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `Camilo Pinzón <${senderEmail}>`,
        to: email,
        subject: t.emails.newsletterSubject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #0f1012;">${t.emails.newsletterGreeting}</h2>
            <p>${t.emails.newsletterThanks}</p>
            <p>${t.emails.newsletterFollowUp}</p>
            <br/>
            <p>${t.emails.newsletterSignOff}</p>
            <p><strong>Camilo Pinzón</strong></p>
          </div>
        `,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: "Unexpected error occurred." };
  }
}
