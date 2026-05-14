import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { adminDb } from '@/lib/firebase/admin';

export const maxDuration = 30; // Max execution time

export async function GET() {
  return new Response("API Chat Route is fully operational and reachable!", { status: 200 });
}

export async function POST(req: Request) {
  console.log('>>> [API Chat] Request received');
  try {
    const { messages, lang = 'es' } = await req.json();
    console.log('>>> [API Chat] Messages parsed:', messages.length);

    // Fetch data from Firestore for context
    const [experienceSnap, projectsSnap] = await Promise.all([
      adminDb.collection('experience').get(),
      adminDb.collection('projects').get()
    ]);

    // Format experience
    const experiences = experienceSnap.docs.map(doc => {
      const data = doc.data();
      const localized = data.translations?.[lang] || data.translations?.['en'] || {};
      return `
- Empresa: ${data.company}
  Cargo: ${localized.jobTitle || data.jobTitle}
  Fechas: ${data.startDate} a ${data.endDate}
  Descripción: ${localized.description || data.description}
  Tags: ${Array.isArray(data.tags) ? data.tags.join(', ') : data.tags}
      `.trim();
    }).join('\n\n');

    // Format projects
    const projects = projectsSnap.docs.map(doc => {
      const data = doc.data();
      const localized = data.translations?.[lang] || data.translations?.['en'] || {};
      return `
- Proyecto: ${localized.title || data.title}
  Descripción: ${localized.description || data.description}
  Tags: ${Array.isArray(data.tags) ? data.tags.join(', ') : data.tags}
      `.trim();
    }).join('\n\n');

    // Build the system prompt
    const systemPrompt = `
Eres el Asistente de IA personal de Camilo Pinzón, diseñado específicamente para ayudar a reclutadores y profesionales de RRHH.
Tu objetivo es proporcionar respuestas precisas y profesionales basadas ÚNICAMENTE en la información proporcionada a continuación sobre el perfil de Camilo.
Debes responder de manera formal pero accesible. Si te hacen una pregunta cuya respuesta no está en el contexto, indica amablemente que no tienes esa información específica pero que pueden contactar a Camilo directamente a través del formulario de contacto o en su LinkedIn.
El idioma de la conversación es preferiblemente ${lang === 'es' ? 'Español' : 'Inglés'}, pero puedes responder en el idioma que el usuario utilice.
Habla siempre en primera persona del plural (como su equipo o asistente) o en tercera persona refiriéndote a Camilo. NO te hagas pasar por Camilo.

--- EXPERIENCIA PROFESIONAL ---
${experiences}

--- PROYECTOS ---
${projects}

Responde a las preguntas del reclutador basándote en esto.
    `.trim();

    // Call Gemini using the Vercel AI SDK
    console.log('>>> [API Chat] Calling streamText with Gemini Flash...');
    const convertedMessages = await convertToModelMessages(messages);
    console.log('>>> [API Chat] Converted messages success');

    const result = streamText({
      model: google('gemini-flash-latest'),
      system: systemPrompt,
      messages: convertedMessages,
    });
    console.log('>>> [API Chat] streamText initialized successfully');

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Error in chat API', { status: 500 });
  }
}
