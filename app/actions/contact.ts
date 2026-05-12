"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Resend } from "resend";

// Inicializa Resend. Si RESEND_API_KEY no existe, no fallará hasta que intente enviar.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const recaptchaToken = formData.get("recaptchaToken") as string;
    
    const isDevelopment = process.env.NODE_ENV === "development";

    // Validar campos obligatorios del formulario
    if (!name || !email || !message) {
      return { success: false, error: "Por favor completa todos los campos." };
    }

    // 1. Validar ReCAPTCHA (Solo en Producción)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!isDevelopment) {
      if (!recaptchaToken || !secretKey) {
        return { success: false, error: "Validación de seguridad no disponible. Recarga la página e intenta de nuevo." };
      }

      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error("ReCAPTCHA falló:", recaptchaData);
        return { success: false, error: "Validación de seguridad fallida. Intenta nuevamente." };
      }
    }

    // 2. Guardar en Firestore
    const contactRef = adminDb.collection("contacts").doc();
    await contactRef.set({
      name,
      email,
      message,
      createdAt: new Date(),
      status: "new",
    });

    // 3. Enviar Correos
    // Define el correo remitente verificado en Resend (por defecto usamos una variable o un estático temporal)
    const senderEmail = process.env.RESEND_SENDER_EMAIL || "hola@camilopinzon.com"; 
    // Define tu correo para recibir notificaciones
    const myEmail = process.env.CONTACT_EMAIL || "hola@camilopinzon.com";

    if (process.env.RESEND_API_KEY) {
      // a) Notificación para ti (Admin)
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

      // b) Auto-respuesta genérica para el usuario
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
      console.warn("Falta RESEND_API_KEY. Los correos no se enviaron, pero el contacto se guardó en Firestore.");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return { success: false, error: "Ocurrió un error inesperado procesando tu solicitud." };
  }
}
