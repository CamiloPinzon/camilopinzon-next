import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { adminDb } from '@/lib/firebase/admin';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const maxDuration = 30; // Max execution time

// Rate limiter: 10 requests per minute per IP
// Lazily initialized so it only runs when env vars are present (skips at build time)
let ratelimit: Ratelimit | null = null;
function getRateLimiter(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('[API Chat] Upstash env vars not set — rate limiting disabled.');
    return null;
  }
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: 'chat_rl',
  });
  return ratelimit;
}

export async function GET() {
  return new Response("API Chat Route is fully operational and reachable!", { status: 200 });
}

export async function POST(req: Request) {
  console.log('>>> [API Chat] Request received');
  try {
    // --- Rate limiting ---
    const limiter = getRateLimiter();
    if (limiter) {
      // Resolve client IP from Vercel/proxy headers, fallback to '127.0.0.1'
      const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        req.headers.get('x-real-ip') ??
        '127.0.0.1';

      const { success, remaining, reset } = await limiter.limit(ip);
      console.log(`>>> [API Chat] Rate limit — IP: ${ip} | remaining: ${remaining}`);

      if (!success) {
        const retryAfterSecs = Math.ceil((reset - Date.now()) / 1000);
        return new Response(
          JSON.stringify({
            error: 'rate_limit_exceeded',
            message: 'Has enviado demasiadas preguntas. Por favor espera un momento e intenta de nuevo.',
            retryAfter: retryAfterSecs,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(retryAfterSecs),
              'X-RateLimit-Remaining': '0',
            },
          }
        );
      }
    }

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
