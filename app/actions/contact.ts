"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation/schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    const recaptchaToken = formData.get("recaptchaToken") as string | null;

    const isDevelopment = process.env.NODE_ENV === "development";

    // 1. Validar con Zod
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos.";
      return { success: false, error: firstError };
    }

    const { name, email, message } = parsed.data;

    // 2. Validar reCAPTCHA (Solo en Producción)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!isDevelopment) {
      if (!recaptchaToken || !secretKey) {
        return {
          success: false,
          error: "Validación de seguridad no disponible. Recarga la página e intenta de nuevo.",
        };
      }

      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error("reCAPTCHA falló:", recaptchaData);
        return {
          success: false,
          error: "Validación de seguridad fallida. Intenta nuevamente.",
        };
      }
    }

    // 3. Guardar en Firestore
    const contactRef = adminDb.collection("contacts").doc();
    await contactRef.set({
      name,
      email,
      message,
      createdAt: new Date(),
      status: "new",
    });

    // 4. Enviar Correos
    const senderEmail = process.env.RESEND_SENDER_EMAIL || "hola@camilopinzon.com";
    const myEmail = process.env.CONTACT_EMAIL || "hola@camilopinzon.com";

    if (process.env.RESEND_API_KEY) {
      // a) Notificación al admin
      await resend.emails.send({
        from: `Website <${senderEmail}>`,
        to: myEmail,
        subject: `Nuevo contacto en la web: ${name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });

      // b) Auto-respuesta al usuario
      await resend.emails.send({
        from: `Camilo Pinzón <${senderEmail}>`,
        to: email,
        subject: "He recibido tu mensaje",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #0f1012;">¡Hola, ${name}!</h2>
            <p>Gracias por escribirme. Este correo es para confirmarte que he recibido tu mensaje correctamente.</p>
            <p>Estaré revisando tu consulta y me pondré en contacto contigo lo más pronto posible.</p>
            <br/>
            <p>Un saludo,</p>
            <p><strong>Camilo Pinzón</strong></p>
          </div>
        `,
      });
    } else {
      console.warn("Falta RESEND_API_KEY. Contacto guardado en Firestore sin enviar correos.");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return {
      success: false,
      error: "Ocurrió un error inesperado procesando tu solicitud.",
    };
  }
}
