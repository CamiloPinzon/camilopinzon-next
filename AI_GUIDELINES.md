# Camilo Pinzon - AI Development Guidelines

Este documento resume la arquitectura, el stack tecnológico y las reglas de diseño del proyecto actual. Su propósito es servir de contexto para la IA en futuras interacciones, evitando la necesidad de reanalizar el sitio completo.

## 1. Stack Tecnológico Principal
- **Framework**: Next.js 16.2.3 (App Router)
- **Librería UI**: React 19.2.4
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4 + Sass
- **Autenticación y Base de Datos**: Firebase (`firebase` y `firebase-admin`)
- **Inteligencia Artificial**: Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Caché y Rate Limiting**: Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`)
- **Emails**: Resend
- **Gestión de Imágenes**: Cloudinary
- **Validación**: Zod
- **Iconos**: Lucide React
- **Seguridad**: Google reCAPTCHA v3

## 2. Arquitectura y Estructura del Proyecto
El proyecto sigue una estructura modular y organizada basada en el App Router de Next.js:

- **`/app`**: Contiene la lógica de enrutamiento y las páginas.
  - Implementa internacionalización (i18n) a través del directorio `[lang]/`.
  - `/actions`: Server Actions globales de la aplicación.
  - `/api`: Rutas de API (Route Handlers).
  - `/admin`: Zona privada o panel de administración.
- **`/components`**: Componentes de React agrupados por dominio o funcionalidad (ej. `chatbot`, `main-hero`, `nav`, `portfolio`, `ui`, etc.). Incluye también `auth-guard.tsx` para protección de rutas.
- **`/lib`**: Utilidades, servicios y configuración.
  - `/actions`: Lógica de negocio y Server Actions específicas.
  - `/cms`, `/firebase`, `/i18n`: Integraciones y configuración centralizada.
  - `/validation`: Esquemas de validación con Zod.
  - `/hooks`: Custom React hooks.
  - `/emails`: Plantillas de correo electrónico.
- **`/public` & `/assets`**: Archivos estáticos.

## 3. Sistema de Diseño (Augen Pro)
El proyecto utiliza un sistema de diseño definido exhaustivamente en `DESIGN.md`. Las reglas más importantes son:
- **Tema**: Claro (Light theme) con alto contraste monocromático y estilo tecnológico/arquitectónico.
- **Colores Clave**:
  - Fondo Principal: Ghost White (`#f2f2f4`) y Canvas (`#fdfdfd`).
  - Texto Principal: Midnight Ink (`#0f1012`).
  - Acción/Interactivo: Future Blue (`#0071e3`). *No usar otros colores cromáticos para UI.*
- **Tipografía**: `PP Neue Montreal` (pesos 350 para títulos, 400 para cuerpo). El letter-spacing es ajustado (`-0.02em`).
- **Layout y Espaciado**: Uso extenso de espacio negativo. Gaps de secciones amplios (`94px`), y un `border-radius` variado (10px para botones, 26px para botones tipo píldora, 54px para componentes grandes).

## 4. Reglas de Desarrollo Críticas
1. **Next.js 16**: Esta versión tiene cambios de API (rompimientos respecto a versiones previas). Revisar la documentación en `node_modules/next/dist/docs/` si existen dudas.
2. **Componentes Limpios**: Mantener los componentes en `/components` organizados por dominio y aislados.
3. **Validación de Datos**: Usar siempre `Zod` para validar datos que provengan de clientes o formularios.
4. **Server Actions vs API Routes**: Priorizar el uso de Server Actions en `/app/actions` o `/lib/actions` para la mutación de datos.
5. **Estilos y Tailwind**: Respetar las Custom Properties de CSS y las variables de Tailwind v4 definidas en `globals.css` / `DESIGN.md`. No introducir estilos genéricos que rompan la estética "Augen Pro".
6. **Seguridad Integrada**: Considerar siempre el paso de reCAPTCHA (`lib/recaptcha.ts`) para formularios, y Rate Limiting de Upstash para endpoints o Server Actions sensibles.
7. **Flujo de Trabajo IA**: Para todo desarrollo nuevo, se debe ejecutar paso a paso (tarea por tarea). Al terminar una tarea, la IA debe explicar qué ha completado y pedir explícitamente autorización antes de escribir el código de la siguiente tarea.
8. **Planificación Rigurosa y Requerimientos**: ANTES de desarrollar cualquier feature, la IA debe preguntar y confirmar TODO el alcance (tokens, variables, flujos, endpoints). Nunca asumir cómo funciona algo si falta información crítica.
9. **Refactorización Activa (Cero 'any')**: Al editar archivos existentes, la IA debe corregir proactivamente tipados `any` o deudas técnicas en los bloques de código que interviene.
10. **Verificación TypeScript Obligatoria**: Después de cada cambio de código o refactorización de tipos, la IA DEBE ejecutar `npx tsc --noEmit` en la terminal para validar que no existan errores de compilación antes de responderle al usuario.

## 5. Skills de Calidad y Buenas Prácticas (QA, a11y, UX)
Estas directrices funcionan como "skills" obligatorias para la IA en cada bloque de código que genere:
1. **Mobile-First por Defecto**: Todas las maquetaciones en Tailwind deben iniciar con clases móviles. Las adaptaciones para pantallas más grandes se harán estrictamente mediante prefijos (`sm:`, `md:`, `lg:`).
2. **Accesibilidad (a11y) Rigurosa**:
   - Todo botón, enlace o elemento interactivo debe tener un `aria-label` si no posee texto descriptivo visible.
   - Las imágenes deben poseer atributos `alt` con descripciones semánticas.
   - Se debe mantener navegación por teclado; está prohibido usar `outline-none` sin proporcionar un `focus-visible` alternativo.
3. **QA & Robustez**:
   - Evitar el uso del tipo `any` en TypeScript. Las interfaces deben estar estrictamente definidas.
   - Todo proceso asíncrono debe contemplar manejo de errores (bloques `try/catch` y/o componentes `error.tsx`).
   - Se deben prever estados de carga explícitos (esqueletos o componentes `loading.tsx`).
4. **Optimización SEO y Performance**:
   - Las páginas deben contener un único `<h1>` y estructura jerárquica clara (`<h2>`, `<h3>`).
   - El renderizado de imágenes pesadas o remotas siempre utilizará el componente `<Image>` de Next.js.
