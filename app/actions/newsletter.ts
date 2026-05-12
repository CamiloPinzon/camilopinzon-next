"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const recaptchaToken = formData.get("recaptchaToken") as string;

    const isDevelopment = process.env.NODE_ENV === "development";

    if (!email || (!recaptchaToken && !isDevelopment)) {
      console.error("Faltan campos. Recibido:", { email, recaptchaToken });
      return { success: false, error: "El correo es obligatorio." };
    }

    // 1. Validar ReCAPTCHA con Google (Solo en Producción)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!isDevelopment) {
      if (!secretKey) {
        return { success: false, error: "Error de configuración." };
      }

      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return {
          success: false,
          error: "Validación de seguridad fallida. Intenta de nuevo.",
        };
      }
    }

    // 2. Comprobar si el email ya existe
    const subscribersRef = adminDb.collection("subscribers");
    const existing = await subscribersRef.where("email", "==", email).get();

    if (!existing.empty) {
      return { success: false, error: "Este correo ya está suscrito." };
    }

    // 3. Guardar en Firestore
    await subscribersRef.add({
      email,
      createdAt: new Date(),
      status: "active",
    });

    // 4. Enviar correo de bienvenida (Opcional)
    const senderEmail =
      process.env.RESEND_SENDER_EMAIL || "hola@camilopinzon.com";

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `Camilo Pinzón <${senderEmail}>`,
        to: email,
        subject: "¡Bienvenido a mi Newsletter!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #0f1012;">¡Hola!</h2>
            <p>Gracias por suscribirte a mi Newsletter.</p>
            <p>De ahora en adelante, recibirás mis nuevos artículos y contenido exclusivo directamente en tu bandeja de entrada.</p>
            <br/>
            <p>Un saludo,</p>
            <p><strong>Camilo Pinzón</strong></p>
          </div>
        `,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: "Ocurrió un error inesperado." };
  }
}
