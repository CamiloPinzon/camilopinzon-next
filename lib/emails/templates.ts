// Plantillas HTML independientes para los correos electrónicos enviados por el servidor.
// Diseñadas para recibir textos localizados e información dinámica y retornar el string HTML listo para enviar.
//
// Estética: Augen Pro — Architectural Blueprint on White Marble.
// Soporta: escritorio + móvil (breakpoint 620 px) y modo oscuro (Apple Mail / Gmail [data-ogsc] / Outlook).

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
    <html lang="es" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>Confirmación de Contacto</title>
      <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
      <style>table, td, div, h1, p { font-family: Arial, Helvetica, sans-serif !important; }</style>
      <![endif]-->
      <style>
        body, table, td, p, a, h1 { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a { text-decoration: none; }
        @media only screen and (max-width: 620px) {
          .container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; border-left: 0 !important; border-right: 0 !important; }
          .px-outer { padding-left: 20px !important; padding-right: 20px !important; }
          .pt-head { padding-top: 28px !important; }
          .pb-body { padding-bottom: 28px !important; }
          .display { font-size: 20px !important; }
          .body-text { font-size: 15px !important; }
          .signature-name { font-size: 15px !important; }
          .wrap-pad { padding: 24px 12px !important; }
        }
        @media (prefers-color-scheme: dark) {
          .bg-page { background-color: #0a0b0d !important; }
          .bg-card { background-color: #141518 !important; border-color: rgba(255,255,255,0.08) !important; }
          .bg-footer { background-color: #0f1013 !important; border-top-color: rgba(255,255,255,0.04) !important; }
          .fg-primary { color: #f2f2f4 !important; }
          .fg-secondary { color: #c4c4c7 !important; }
          .fg-tertiary { color: #8a8a8d !important; }
          .divider { border-top-color: rgba(255,255,255,0.08) !important; }
          .accent-bar { background-color: #f2f2f4 !important; }
          .accent-text { color: #4ea1ff !important; }
        }
        [data-ogsc] .bg-page { background-color: #0a0b0d !important; }
        [data-ogsc] .bg-card { background-color: #141518 !important; border-color: rgba(255,255,255,0.08) !important; }
        [data-ogsc] .bg-footer { background-color: #0f1013 !important; border-top-color: rgba(255,255,255,0.04) !important; }
        [data-ogsc] .fg-primary { color: #f2f2f4 !important; }
        [data-ogsc] .fg-secondary { color: #c4c4c7 !important; }
        [data-ogsc] .fg-tertiary { color: #8a8a8d !important; }
        [data-ogsc] .divider { border-top-color: rgba(255,255,255,0.08) !important; }
        [data-ogsc] .accent-bar { background-color: #f2f2f4 !important; }
        [data-ogsc] .accent-text { color: #4ea1ff !important; }
      </style>
    </head>
    <body class="bg-page" style="margin:0; padding:0; background-color:#f2f2f4; color:#0f1012; font-family:'PP Neue Montreal','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased;">
      <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
        ${thanks} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
      </div>
      <table role="presentation" class="bg-page wrap-pad" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f2f2f4; padding:40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" class="container bg-card" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid rgba(15,16,18,0.08); border-radius:12px; overflow:hidden;">
              <tr>
                <td class="accent-bar" height="2" style="height:2px; line-height:2px; font-size:0; background-color:#0f1012;">&nbsp;</td>
              </tr>
              <tr>
                <td class="px-outer pt-head" style="padding:36px 40px 0 40px;">
                  <span class="fg-tertiary" style="font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:11px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:#8f8f8f;">
                    Camilo Pinz&oacute;n &nbsp;&middot;&nbsp; Estudio
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:28px 40px 8px 40px;">
                  <h1 class="display fg-primary" style="margin:0; font-family:'PP Neue Montreal','Inter',-apple-system,BlinkMacSystemFont,Arial,sans-serif; font-size:27px; font-weight:350; line-height:1.2; letter-spacing:-0.54px; color:#0f1012;">
                    ${greeting}
                  </h1>
                </td>
              </tr>
              <tr>
                <td class="px-outer pb-body" style="padding:14px 40px 32px 40px;">
                  <p class="body-text fg-secondary" style="margin:0 0 14px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:16px; line-height:1.6; letter-spacing:-0.01em; color:#4a4a4d;">${thanks}</p>
                  <p class="body-text fg-secondary" style="margin:0 0 28px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:16px; line-height:1.6; letter-spacing:-0.01em; color:#4a4a4d;">${followUp}</p>
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td class="divider" style="border-top:1px solid rgba(15,16,18,0.06); padding-top:20px;">
                        <p class="fg-tertiary" style="margin:0 0 4px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:13px; line-height:1.4; color:#8f8f8f;">${signOff}</p>
                        <p class="signature-name fg-primary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:16px; font-weight:600; letter-spacing:-0.01em; color:#0f1012;">Camilo Pinz&oacute;n</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="bg-footer" style="background-color:#fafafa; padding:18px 40px; border-top:1px solid rgba(15,16,18,0.04);" align="center">
                  <p class="fg-tertiary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:12px; line-height:1.5; color:#8f8f8f;">
                    Este es un correo autom&aacute;tico generado desde
                    <a class="fg-tertiary" href="https://camilopinzon.com" style="color:#8f8f8f; text-decoration:underline;">camilopinzon.com</a>.
                    Por favor no respondas a este mensaje.
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
    <html lang="es" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="format-detection" content="telephone=no, date=no, address=no">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>Nuevo mensaje de contacto</title>
      <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
      <style>table, td, div, h1, h2, p { font-family: Arial, Helvetica, sans-serif !important; }</style>
      <![endif]-->
      <style>
        body, table, td, p, a, h1, h2 { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a { text-decoration: none; }
        @media only screen and (max-width: 620px) {
          .container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; border-left: 0 !important; border-right: 0 !important; }
          .px-outer { padding-left: 20px !important; padding-right: 20px !important; }
          .wrap-pad { padding: 24px 12px !important; }
          .heading-lg { font-size: 22px !important; }
          .meta-row td { display: block !important; width: 100% !important; padding: 0 !important; }
          .meta-row .meta-label { padding-top: 14px !important; padding-bottom: 2px !important; }
          .meta-row .meta-value { padding-bottom: 6px !important; }
          .meta-row .meta-divider { display: none !important; }
        }
        @media (prefers-color-scheme: dark) {
          .bg-page   { background-color: #0a0b0d !important; }
          .bg-card   { background-color: #141518 !important; border-color: rgba(255,255,255,0.08) !important; }
          .bg-footer { background-color: #0f1013 !important; border-top-color: rgba(255,255,255,0.04) !important; }
          .bg-quote  { background-color: #1b1c20 !important; }
          .fg-primary   { color: #f2f2f4 !important; }
          .fg-secondary { color: #c4c4c7 !important; }
          .fg-tertiary  { color: #8a8a8d !important; }
          .accent-text  { color: #4ea1ff !important; }
          .accent-bar   { background-color: #4ea1ff !important; }
          .accent-border-left { border-left-color: #4ea1ff !important; }
          .meta-divider { background-color: rgba(255,255,255,0.06) !important; }
          .pill { background-color: rgba(78,161,255,0.14) !important; color: #4ea1ff !important; }
        }
        [data-ogsc] .bg-page   { background-color: #0a0b0d !important; }
        [data-ogsc] .bg-card   { background-color: #141518 !important; border-color: rgba(255,255,255,0.08) !important; }
        [data-ogsc] .bg-footer { background-color: #0f1013 !important; border-top-color: rgba(255,255,255,0.04) !important; }
        [data-ogsc] .bg-quote  { background-color: #1b1c20 !important; }
        [data-ogsc] .fg-primary   { color: #f2f2f4 !important; }
        [data-ogsc] .fg-secondary { color: #c4c4c7 !important; }
        [data-ogsc] .fg-tertiary  { color: #8a8a8d !important; }
        [data-ogsc] .accent-text  { color: #4ea1ff !important; }
        [data-ogsc] .accent-bar   { background-color: #4ea1ff !important; }
        [data-ogsc] .accent-border-left { border-left-color: #4ea1ff !important; }
        [data-ogsc] .meta-divider { background-color: rgba(255,255,255,0.06) !important; }
        [data-ogsc] .pill { background-color: rgba(78,161,255,0.14) !important; color: #4ea1ff !important; }
      </style>
    </head>
    <body class="bg-page" style="margin:0; padding:0; background-color:#f2f2f4; color:#0f1012; font-family:'PP Neue Montreal','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased;">
      <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
        Nuevo mensaje de ${name}. &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
      </div>
      <table role="presentation" class="bg-page wrap-pad" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f2f2f4; padding:40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" class="container bg-card" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid rgba(15,16,18,0.08); border-radius:12px; overflow:hidden;">
              <tr>
                <td class="accent-bar" height="4" style="height:4px; line-height:4px; font-size:0; background-color:#0071e3;">&nbsp;</td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:32px 40px 0 40px;">
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left" valign="middle">
                        <span class="fg-tertiary" style="font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:11px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:#8f8f8f;">
                          Notificaci&oacute;n interna
                        </span>
                      </td>
                      <td align="right" valign="middle">
                        <span class="pill" style="display:inline-block; padding:4px 10px; background-color:rgba(0,113,227,0.08); color:#0071e3; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.04em; border-radius:26px;">
                          Web &middot; Contacto
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:22px 40px 6px 40px;">
                  <h1 class="heading-lg fg-primary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:24px; font-weight:600; line-height:1.2; letter-spacing:-0.48px; color:#0f1012;">
                    Nuevo mensaje de contacto
                  </h1>
                </td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:26px 40px 8px 40px;">
                  <table role="presentation" class="meta-row" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td class="meta-label fg-tertiary" width="100" valign="top" style="width:100px; padding:10px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; color:#8f8f8f;">Nombre</td>
                      <td class="meta-value fg-primary" valign="top" style="padding:10px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:15px; line-height:1.5; color:#0f1012;">${name}</td>
                    </tr>
                    <tr><td class="meta-divider" colspan="2" style="background-color:rgba(15,16,18,0.06); height:1px; line-height:1px; font-size:0;">&nbsp;</td></tr>
                    <tr>
                      <td class="meta-label fg-tertiary" width="100" valign="top" style="width:100px; padding:10px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; color:#8f8f8f;">Email</td>
                      <td class="meta-value" valign="top" style="padding:10px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:15px; line-height:1.5;">
                        <a class="accent-text" href="mailto:${email}" style="color:#0071e3; text-decoration:none; border-bottom:1px solid rgba(0,113,227,0.3);">${email}</a>
                      </td>
                    </tr>
                    <tr><td class="meta-divider" colspan="2" style="background-color:rgba(15,16,18,0.06); height:1px; line-height:1px; font-size:0;">&nbsp;</td></tr>
                    <tr>
                      <td class="meta-label fg-tertiary" width="100" valign="top" style="width:100px; padding:10px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; color:#8f8f8f;">Idioma</td>
                      <td class="meta-value" valign="top" style="padding:10px 0;">
                        <span class="pill" style="display:inline-block; padding:3px 10px; background-color:rgba(15,16,18,0.06); color:#0f1012; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.08em; border-radius:26px;">${lang.toUpperCase()}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:18px 40px 8px 40px;">
                  <p class="fg-tertiary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; color:#8f8f8f;">Mensaje</p>
                </td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:0 40px 32px 40px;">
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="bg-quote accent-border-left" style="background-color:#f7f7f9; border-left:3px solid #0071e3; border-radius:0 8px 8px 0;">
                    <tr>
                      <td style="padding:18px 20px;">
                        <p class="fg-secondary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:15px; line-height:1.6; letter-spacing:-0.01em; color:#4a4a4d; white-space:pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="bg-footer" align="center" style="background-color:#fafafa; padding:16px 40px; border-top:1px solid rgba(15,16,18,0.04);">
                  <p class="fg-tertiary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:12px; line-height:1.5; color:#8f8f8f;">
                    Generado autom&aacute;ticamente por el formulario de
                    <a class="fg-tertiary" href="https://camilopinzon.com" style="color:#8f8f8f; text-decoration:underline;">camilopinzon.com</a>
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
    <html lang="es" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>Bienvenido al Newsletter</title>
      <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
      <style>table, td, div, h1, p { font-family: Arial, Helvetica, sans-serif !important; }</style>
      <![endif]-->
      <style>
        body, table, td, p, a, h1 { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a { text-decoration: none; }
        @media only screen and (max-width: 620px) {
          .container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; border-left: 0 !important; border-right: 0 !important; }
          .px-outer { padding-left: 20px !important; padding-right: 20px !important; }
          .display { font-size: 22px !important; }
          .body-text { font-size: 15px !important; }
          .signature-name { font-size: 15px !important; }
          .wrap-pad { padding: 24px 12px !important; }
        }
        @media (prefers-color-scheme: dark) {
          .bg-page   { background-color: #0a0b0d !important; }
          .bg-card   { background-color: #141518 !important; border-color: rgba(255,255,255,0.08) !important; }
          .bg-footer { background-color: #0f1013 !important; border-top-color: rgba(255,255,255,0.04) !important; }
          .fg-primary   { color: #f2f2f4 !important; }
          .fg-secondary { color: #c4c4c7 !important; }
          .fg-tertiary  { color: #8a8a8d !important; }
          .accent-bar   { background-color: #4ea1ff !important; }
          .divider { border-top-color: rgba(255,255,255,0.08) !important; }
        }
        [data-ogsc] .bg-page   { background-color: #0a0b0d !important; }
        [data-ogsc] .bg-card   { background-color: #141518 !important; border-color: rgba(255,255,255,0.08) !important; }
        [data-ogsc] .bg-footer { background-color: #0f1013 !important; border-top-color: rgba(255,255,255,0.04) !important; }
        [data-ogsc] .fg-primary   { color: #f2f2f4 !important; }
        [data-ogsc] .fg-secondary { color: #c4c4c7 !important; }
        [data-ogsc] .fg-tertiary  { color: #8a8a8d !important; }
        [data-ogsc] .accent-bar   { background-color: #4ea1ff !important; }
        [data-ogsc] .divider { border-top-color: rgba(255,255,255,0.08) !important; }
      </style>
    </head>
    <body class="bg-page" style="margin:0; padding:0; background-color:#f2f2f4; color:#0f1012; font-family:'PP Neue Montreal','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased;">
      <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
        ${thanks} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
      </div>
      <table role="presentation" class="bg-page wrap-pad" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f2f2f4; padding:40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" class="container bg-card" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid rgba(15,16,18,0.08); border-radius:12px; overflow:hidden;">
              <tr>
                <td class="accent-bar" height="6" style="height:6px; line-height:6px; font-size:0; background-color:#0071e3;">&nbsp;</td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:32px 40px 10px 40px;">
                  <h1 class="display fg-primary" style="margin:0; font-family:'PP Neue Montreal','Inter',-apple-system,BlinkMacSystemFont,Arial,sans-serif; font-size:27px; font-weight:600; line-height:1.2; letter-spacing:-0.54px; color:#0f1012;">
                    ${greeting}
                  </h1>
                </td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:10px 40px 32px 40px;">
                  <p class="body-text fg-secondary" style="margin:0 0 16px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:15px; line-height:1.6; letter-spacing:-0.01em; color:#4a4a4d;">${thanks}</p>
                  <p class="body-text fg-secondary" style="margin:0 0 24px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:15px; line-height:1.6; letter-spacing:-0.01em; color:#4a4a4d;">${followUp}</p>
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td class="divider" style="border-top:1px solid rgba(15,16,18,0.06); padding-top:20px; margin-top:10px;">
                        <p class="fg-tertiary" style="margin:0 0 4px 0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:14px; line-height:1.4; color:#8f8f8f;">${signOff}</p>
                        <p class="signature-name fg-primary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:16px; font-weight:600; letter-spacing:-0.01em; color:#0f1012;">Camilo Pinz&oacute;n</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="bg-footer" align="center" style="background-color:#fafafa; padding:16px 40px; border-top:1px solid rgba(15,16,18,0.04);">
                  <p class="fg-tertiary" style="margin:0; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; font-size:12px; line-height:1.5; color:#8f8f8f;">
                    Te has suscrito para recibir las &uacute;ltimas publicaciones y actualizaciones de
                    <a class="fg-tertiary" href="https://camilopinzon.com" style="color:#8f8f8f; text-decoration:underline;">camilopinzon.com</a>
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

interface NewPostProps {
  greeting: string;
  message: string;
  ctaText: string;
  postUrl: string;
  signOff: string;
  unsubscribeText: string;
  unsubscribeUrl: string;
}

export function renderNewPostHtml({
  greeting,
  message,
  ctaText,
  postUrl,
  signOff,
  unsubscribeText,
  unsubscribeUrl,
}: NewPostProps): string {
  return `
    <!DOCTYPE html>
    <html lang="es" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>Nuevo Artículo</title>
      <style>
        body, table, td, p, a, h1 { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a { text-decoration: none; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #0071e3; color: #ffffff !important; border-radius: 8px; font-weight: 600; text-align: center; }
        @media only screen and (max-width: 620px) {
          .container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
          .px-outer { padding-left: 20px !important; padding-right: 20px !important; }
        }
        @media (prefers-color-scheme: dark) {
          .bg-page   { background-color: #0a0b0d !important; }
          .bg-card   { background-color: #141518 !important; border-color: rgba(255,255,255,0.08) !important; }
          .fg-primary   { color: #f2f2f4 !important; }
          .fg-secondary { color: #c4c4c7 !important; }
          .fg-tertiary  { color: #8a8a8d !important; }
        }
      </style>
    </head>
    <body class="bg-page" style="margin:0; padding:0; background-color:#f2f2f4; color:#0f1012; font-family:'PP Neue Montreal','Inter',Arial,sans-serif; -webkit-font-smoothing:antialiased;">
      <table role="presentation" class="bg-page wrap-pad" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f2f2f4; padding:40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" class="container bg-card" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid rgba(15,16,18,0.08); border-radius:12px; overflow:hidden;">
              <tr>
                <td height="6" style="height:6px; line-height:6px; font-size:0; background-color:#0071e3;">&nbsp;</td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:32px 40px 10px 40px;">
                  <h1 class="fg-primary" style="margin:0; font-size:24px; font-weight:600; line-height:1.2; color:#0f1012;">
                    ${greeting}
                  </h1>
                </td>
              </tr>
              <tr>
                <td class="px-outer" style="padding:10px 40px 32px 40px;">
                  <p class="fg-secondary" style="margin:0 0 24px 0; font-size:16px; line-height:1.6; color:#4a4a4d;">${message}</p>
                  
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                    <tr>
                      <td align="center">
                        <a href="${postUrl}" class="btn" style="background-color: #0071e3; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block;">
                          ${ctaText}
                        </a>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="border-top:1px solid rgba(15,16,18,0.06); padding-top:20px; margin-top:10px;">
                        <p class="fg-tertiary" style="margin:0 0 4px 0; font-size:14px; line-height:1.4; color:#8f8f8f;">${signOff}</p>
                        <p class="fg-primary" style="margin:0; font-size:16px; font-weight:600; color:#0f1012;">Camilo Pinz&oacute;n</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color:#fafafa; padding:16px 40px; border-top:1px solid rgba(15,16,18,0.04);">
                  <p class="fg-tertiary" style="margin:0; font-size:12px; line-height:1.5; color:#8f8f8f;">
                    <a href="${unsubscribeUrl}" style="color:#8f8f8f; text-decoration:underline;">${unsubscribeText}</a>
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
