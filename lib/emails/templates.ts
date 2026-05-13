// Plantillas HTML independientes para los correos electrónicos enviados por el servidor.
// Diseñadas para recibir textos localizados e información dinámica y retornar el string HTML listo para enviar.

interface ContactAutoReplyProps {
  greeting: string;
  thanks: string;
  followUp: string;
  signOff: string;
}

export function renderContactAutoReplyHtml({
  greeting,
  thanks,
  followUp,
  signOff,
}: ContactAutoReplyProps): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-fit=cover, initial-scale=1.0">
      <title>Confirmación de Contacto</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f2f2f4; color: #0f1012; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f2f2f4; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid rgba(15, 16, 18, 0.08); overflow: hidden;">
              <!-- Cabecera simple y limpia -->
              <tr>
                <td style="padding: 32px 40px 10px 40px;">
                  <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #0f1012; letter-spacing: -0.02em;">
                    ${greeting}
                  </h1>
                </td>
              </tr>
              <!-- Cuerpo del mensaje -->
              <tr>
                <td style="padding: 10px 40px 32px 40px; font-size: 15px; line-height: 1.6; color: #4a4a4d;">
                  <p style="margin: 0 0 16px 0;">${thanks}</p>
                  <p style="margin: 0 0 24px 0;">${followUp}</p>
                  
                  <div style="border-top: 1px solid rgba(15, 16, 18, 0.06); padding-top: 20px; margin-top: 10px;">
                    <p style="margin: 0 0 4px 0; color: #8f8f8f; font-size: 14px;">${signOff}</p>
                    <p style="margin: 0; font-weight: 600; color: #0f1012;">Camilo Pinzón</p>
                  </div>
                </td>
              </tr>
              <!-- Pie de página del correo -->
              <tr>
                <td style="background-color: #fafafa; padding: 16px 40px; text-align: center; border-top: 1px solid rgba(15, 16, 18, 0.04);">
                  <p style="margin: 0; font-size: 12px; color: #8f8f8f;">
                    Este es un correo automático generado desde camilopinzon.com. Por favor no respondas a este mensaje.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

interface AdminNotificationProps {
  name: string;
  email: string;
  lang: string;
  message: string;
}

export function renderAdminContactNotificationHtml({
  name,
  email,
  lang,
  message,
}: AdminNotificationProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Nuevo Contacto Web</title>
    </head>
    <body style="font-family: sans-serif; color: #333; line-height: 1.5; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #ddd; padding: 24px; border-radius: 8px;">
        <h2 style="margin-top: 0; color: #0071e3; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
          Nuevo mensaje de contacto
        </h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="margin-bottom: 20px;">
          <tr>
            <td width="100" style="color: #666; font-weight: bold;">Nombre:</td>
            <td>${name}</td>
          </tr>
          <tr>
            <td style="color: #666; font-weight: bold;">Email:</td>
            <td><a href="mailto:${email}" style="color: #0071e3;">${email}</a></td>
          </tr>
          <tr>
            <td style="color: #666; font-weight: bold;">Idioma:</td>
            <td><span style="background: #eee; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${lang.toUpperCase()}</span></td>
          </tr>
        </table>
        <h4 style="margin: 0 0 8px 0; color: #666;">Mensaje:</h4>
        <div style="background: #f9f9f9; padding: 16px; border-left: 4px solid #0071e3; border-radius: 0 4px 4px 0; white-space: pre-wrap;">${message}</div>
      </div>
    </body>
    </html>
  `;
}

interface NewsletterWelcomeProps {
  greeting: string;
  thanks: string;
  followUp: string;
  signOff: string;
}

export function renderNewsletterWelcomeHtml({
  greeting,
  thanks,
  followUp,
  signOff,
}: NewsletterWelcomeProps): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-fit=cover, initial-scale=1.0">
      <title>Bienvenido al Newsletter</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f2f2f4; color: #0f1012; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f2f2f4; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid rgba(15, 16, 18, 0.08); overflow: hidden;">
              <!-- Banner superior acentuado -->
              <tr>
                <td style="background-color: #0071e3; height: 6px;"></td>
              </tr>
              <!-- Cabecera -->
              <tr>
                <td style="padding: 32px 40px 10px 40px;">
                  <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #0f1012; letter-spacing: -0.02em;">
                    ${greeting}
                  </h1>
                </td>
              </tr>
              <!-- Cuerpo del mensaje -->
              <tr>
                <td style="padding: 10px 40px 32px 40px; font-size: 15px; line-height: 1.6; color: #4a4a4d;">
                  <p style="margin: 0 0 16px 0;">${thanks}</p>
                  <p style="margin: 0 0 24px 0;">${followUp}</p>
                  
                  <div style="border-top: 1px solid rgba(15, 16, 18, 0.06); padding-top: 20px; margin-top: 10px;">
                    <p style="margin: 0 0 4px 0; color: #8f8f8f; font-size: 14px;">${signOff}</p>
                    <p style="margin: 0; font-weight: 600; color: #0f1012;">Camilo Pinzón</p>
                  </div>
                </td>
              </tr>
              <!-- Pie de página -->
              <tr>
                <td style="background-color: #fafafa; padding: 16px 40px; text-align: center; border-top: 1px solid rgba(15, 16, 18, 0.04);">
                  <p style="margin: 0; font-size: 12px; color: #8f8f8f;">
                    Te has suscrito para recibir las últimas publicaciones y actualizaciones de camilopinzon.com
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
