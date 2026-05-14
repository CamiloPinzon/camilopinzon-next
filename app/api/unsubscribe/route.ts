import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    const subscribersRef = adminDb.collection('subscribers');
    const snapshot = await subscribersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      // It's fine if they don't exist
      return NextResponse.json({ message: 'Email not found or already unsubscribed.' });
    }

    // Update status to 'unsubscribed' instead of deleting to keep a record, or delete entirely.
    // Setting status to unsubscribed is safer.
    const batch = adminDb.batch();
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { status: 'unsubscribed', unsubscribedAt: new Date() });
    });

    await batch.commit();

    // Instead of a JSON response, maybe return a nice HTML page.
    return new NextResponse(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Suscripción cancelada</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f4f7fe; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #2b3674; text-align: center; }
          .container { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 24px rgba(112, 144, 176, 0.08); max-width: 400px; width: 90%; }
          h1 { margin-top: 0; font-size: 24px; font-weight: 700; color: #0071e3; }
          p { color: #a3aed1; line-height: 1.5; margin-bottom: 24px; }
          a { display: inline-block; background: #0071e3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Suscripción cancelada</h1>
          <p>Te has dado de baja de la lista de correos. Ya no recibirás notificaciones sobre nuevos artículos.</p>
          <a href="/">Volver al inicio</a>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Error in unsubscribe API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
