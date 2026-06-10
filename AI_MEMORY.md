# AI Memory Log

Este archivo contiene el contexto dinámico y reciente del proyecto. Su propósito es que la IA pueda leerlo al iniciar una nueva tarea y arrancar con pleno conocimiento de lo que se ha hecho últimamente, sin necesidad de explorar todo el historial de chats o analizar todos los archivos del repositorio.

> **Regla Crítica para la IA:** Este archivo **SOLO** debe ser actualizado cuando el usuario indique que es el "final del día", "cierre de sesión" o cuando pida explícitamente guardar el progreso actual.

---

## 📅 Última Actualización
- **Fecha:** 9 de Junio de 2026

## 🚀 Estado Actual del Proyecto
- Next.js 16 (App Router) en TypeScript con Firebase (Admin y Cliente), Vercel AI SDK, y Tailwind v4.
- Se implementó automatización funcional: El panel de administración (CMS) publica posts en LinkedIn de forma automática al ser guardados y marcados como publicados.
- Se actualizaron las `AI_GUIDELINES.md` para incluir el sistema de "Skills de Calidad" obligatorias (Mobile-First, a11y, QA estricto y SEO).
- **Importante:** Se ha establecido una regla de flujo de trabajo donde la IA siempre pedirá autorización **tarea por tarea** en los futuros desarrollos.

## ✅ Tareas Completadas Recientemente
- [x] Creación del documento de contexto `AI_GUIDELINES.md` y memoria de IA `AI_MEMORY.md`.
- [x] Desarrollo e integración del Server Action de LinkedIn (`app/actions/linkedin.ts`) en el guardado del CMS (`page.tsx`).
- [x] Análisis rápido de seguridad y deuda técnica general del repositorio.
- [x] Refactorización: Eliminado uso de `any` en `cms.ts` y `linkedin.ts` por tipado estricto (`Record`, `unknown`).

## 🚧 Tareas en Progreso / Siguientes Pasos (Pendientes para la próxima sesión)
1. **Seguridad (Crítico):** Refactorizar los Server Actions para protegerlos en el backend validando la sesión del administrador.
2. **Mejora Arquitectónica:** Refactorizar el "data fetching" del CMS para que opere en *Server Components* nativos en vez de depender de `useEffect` en el cliente.
4. **Optimización:** Ejecutar las notificaciones (Newsletter + LinkedIn) asíncronamente o con `Promise.all()` para no bloquear la interfaz.

## 🐛 Problemas Conocidos o Notas Críticas
- **BRECHA DE SEGURIDAD ALTA:** Los Server Actions actuales mutan Firebase directamente usando `adminDb` pero carecen de validación de sesión (un actor malicioso podría invocar la ruta si conoce los payloads).
- Falta integrar manejo global de errores (Toasts en lugar de `alerts()`).
- **LECCIÓN APRENDIDA RECIENTE:** La IA omitió revisar y ejecutar validaciones locales de TypeScript después de una refactorización de tipos (`any` a `unknown`), lo que causó un error en tiempo de desarrollo. **Para futuros ciclos:** Siempre usar `npx tsc --noEmit` tras tocar código y corregir "any"s heredados.
