# AI Memory Log

Este archivo contiene el contexto dinámico y reciente del proyecto. Su propósito es que la IA pueda leerlo al iniciar una nueva tarea y arrancar con pleno conocimiento de lo que se ha hecho últimamente, sin necesidad de explorar todo el historial de chats o analizar todos los archivos del repositorio.

> **Regla Crítica para la IA:** Este archivo **SOLO** debe ser actualizado cuando el usuario indique que es el "final del día", "cierre de sesión" o cuando pida explícitamente guardar el progreso actual.

---

## 📅 Última Actualización
- **Fecha:** 23 de Junio de 2026

## 🚀 Estado Actual del Proyecto
- Next.js 16 (App Router) en TypeScript con Firebase (Admin y Cliente), Vercel AI SDK, y Tailwind v4.
- Los Server Actions están protegidos criptográficamente en el backend validando *Firebase Session Cookies* (`/api/auth`).
- Se implementó automatización funcional: El panel de administración (CMS) publica posts en LinkedIn de forma automática al ser guardados y marcados como publicados.
- Se actualizaron las `AI_GUIDELINES.md` para incluir el sistema de "Skills de Calidad" obligatorias (Mobile-First, a11y, QA estricto y SEO) y la regla estricta de ejecución.
- **Importante (HARD CONSTRAINT):** Se ha establecido una regla inviolable donde la IA **tiene prohibido** ejecutar comandos o modificar archivos a menos que el usuario incluya la palabra exacta **"AUTHORIZE"** (o "AUTORIZO") en su prompt. La IA debe detenerse siempre y pedir permiso explícito tarea por tarea.

> **SESIÓN CERRADA:** El progreso se ha pausado.
> **CONTEXTO DE CONTINUACIÓN (IMPORTANTE PARA LA PRÓXIMA SESIÓN):** El usuario finalizó la sesión tras completar la implementación completa del sistema de temas (incluyendo `ThemeProvider` y `ThemeSelector` en `main-nav.tsx`). El objetivo inicial de retomar el trabajo en `app/admin/(dashboard)/collections/[collectionId]/[docId]/page.tsx` para refactorizar el CMS sigue pendiente y debe ser la primera prioridad al reiniciar.

## ✅ Tareas Completadas Recientemente
- [x] **Resolución de Errores Estrictos:** Se corrigieron advertencias y errores bloqueantes de ESLint (`react-hooks/set-state-in-effect` y variables sin uso en `admin.ts`) para garantizar que la compilación y validación sean 100% exitosas.
- [x] **ThemeProvider y Selector (UI):** Creado el `ThemeProvider` con soporte para 3 estados (`light`, `dark`, `dynamic`), sincronizado con `localStorage` e inyección de `--theme-progress`. Se integró un `ThemeSelector` (3-way toggle) visualmente consistente (estilo pill) en la barra de navegación principal (`main-nav.tsx`).
- [x] **Sistema de Temas Dinámicos:** Implementada la transición fluida de temas (Light/Dark/Dynamic) usando `color-mix` en CSS (`globals.css`) y un inyector de variables (`theme-script.tsx`) para prevenir destellos de renderizado (FOUC). Inyección en `app/layout.tsx`.
- [x] Implementación de **Firebase Session Cookies** para blindar los Server Actions del CMS y utilidades relacionadas.
- [x] Creación del documento de contexto `AI_GUIDELINES.md` y memoria de IA `AI_MEMORY.md`.
- [x] Desarrollo e integración del Server Action de LinkedIn (`app/actions/linkedin.ts`) en el guardado del CMS (`page.tsx`).
- [x] Análisis rápido de seguridad y deuda técnica general del repositorio.
- [x] Refactorización: Eliminado uso de `any` en `cms.ts` y `linkedin.ts` por tipado estricto (`Record`, `unknown`).

## 🚧 Tareas en Progreso / Siguientes Pasos (Pendientes para la próxima sesión)
> **🎯 Siguiente Tarea Principal Acordada:** Refactorizar el "data fetching" del panel de administración (CMS) a *Server Components*.

1. **Mejora Arquitectónica:** Migrar el panel del CMS para que use *Server Components* nativos al cargar datos (actualmente depende de `useEffect` en el cliente).
2. **Optimización:** Ejecutar las notificaciones (Newsletter + LinkedIn) asíncronamente o con `Promise.all()` para no bloquear la interfaz al guardar.
3. **Manejo de Errores UX:** Integrar un sistema global de notificaciones (Toasts) en lugar de usar `alert()`.

## 🐛 Problemas Conocidos o Notas Críticas
- **LECCIÓN APRENDIDA RECIENTE (1):** La IA omitió revisar y ejecutar validaciones locales de TypeScript después de una refactorización de tipos (`any` a `unknown`), lo que causó un error en tiempo de desarrollo. **Para futuros ciclos:** Siempre usar `npx tsc --noEmit` tras tocar código y corregir "any"s heredados.
- **LECCIÓN APRENDIDA RECIENTE (2):** La configuración estricta de ESLint del proyecto bloquea llamadas a estado dentro de efectos (`react-hooks/set-state-in-effect`). Al implementar sincronización con `localStorage` y control de hidratación (`mounted`), usar la directiva `// eslint-disable-next-line react-hooks/set-state-in-effect` es necesario para el App Router si se hace de esa forma. Siempre ejecutar `npm run lint` antes de dar por cerrada una tarea.
