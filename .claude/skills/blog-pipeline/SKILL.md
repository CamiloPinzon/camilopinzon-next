---
name: blog-pipeline
description: Flujo recurrente para mantener actualizado el blog de camilopinzon.dev - revisión de noticias de fuentes oficiales (lunes, miércoles y viernes), borrador para aprobación, versión final en/es, imágenes en Claude Design con alt en/es, y publicación bilingüe en Firestore más LinkedIn y newsletter. Úsala cuando el usuario pida noticias para el blog, elija una noticia, apruebe un borrador o imágenes, o pida publicar una entrada.
---

# blog-pipeline — mantener el blog actualizado

Siete pasos con **tres puntos de aprobación** del usuario. Nunca saltar un punto de aprobación ni
adelantar el paso siguiente sin él. Cada respuesta indica en qué paso está el post y qué falta.

| Paso | Qué se hace | Termina cuando |
|---|---|---|
| 1. Noticias | Lista de 4-6 noticias de fuentes oficiales | El usuario elige una |
| 2. Borrador (es) | Análisis "para dummies" | **Aprobación 1** del borrador |
| 3. Versión final | `content.es.html` + `content.en.html` + `post.json` | — |
| 4. Imágenes | Portada en Claude Design | — |
| 5. Alt en/es | Alt de cada imagen | **Aprobación 2** de imágenes + alt |
| 6. Publicación | Blog en/es + LinkedIn + newsletter con `npm run blog:publish -- ... --commit`, luego commit y push | **Aprobación 3**: "publica" |
| 7. Verificación | Revisar /en, /es, LinkedIn y el envío del newsletter | Post visible en ambos idiomas y en LinkedIn, newsletter enviado |

## 1. Revisión de noticias (lunes, miércoles y viernes)

La tarea programada `camilopinzon-blog-news-review` la corre lunes, miércoles y viernes a las 8:00. También
se puede pedir a mano.

- **Solo fuentes oficiales**: el blog, changelog, documentación o avisos de seguridad de quien hace
  el anuncio. Ejemplos: nextjs.org/blog, github.com/vercel/next.js (releases y advisories),
  vercel.com/blog, react.dev/blog, wordpress.org/news, developers.google.com/search/blog,
  blog.google, developer.chrome.com, web.dev, anthropic.com/news, openai.com/news, github.blog.
  Nada de medios de terceros, agregadores ni rumores.
- Temas de la marca: aplicaciones web/SaaS, Next.js y React, WordPress, frontend/UI, rendimiento y
  SEO técnico, IA aplicada a productos web, pagos y formularios (Google Wallet/Pay).
- Ventana: el lunes cubre viernes-domingo; el miércoles, lunes-martes; el viernes, miércoles-jueves.
- Antes de armar la lista, revisar `articulos-del-mes.md` y `https://camilopinzon.dev/es/blog`, y
  descartar lo que ya se cubrió (ver "Lista mensual de artículos"). Si se descarta algo, decirlo en
  una línea al final de la entrega.
- Abrir cada página antes de incluirla para verificar la fecha y el contenido.
- Entregar por noticia: título, fecha, fuente (nombre + enlace), resumen en 2 frases, a quién
  afecta y por qué sería un buen post. Ordenar por impacto para dueños de negocio y equipos no
  técnicos. Cerrar con una recomendación y pedir que elija.
- Si una noticia anuncia algo que todavía no salió (por ejemplo, un parche programado), decirlo y
  marcar en el borrador los datos que faltan con `[CONFIRMAR]`.

### Lista mensual de artículos

`articulos-del-mes.md`, en esta misma carpeta, evita proponer dos veces el mismo tema.

- **Qué cuenta como cruce:** el mismo anuncio o hecho que ya cubrió un artículo, aunque venga de
  otra fuente o con otro título. Un hecho nuevo de fondo sobre el mismo producto no es cruce; se
  puede proponer, diciendo qué artículo existe y qué añade la noticia.
- **Cuándo se agrega una línea:** al publicar (paso 6) y cuando el usuario diga que un tema ya se
  hizo, indicando eso en el estado. Los posts creados desde `/admin` no pasan por el script: si la
  revisión encuentra uno en el blog que no está en la lista, tratarlo como cubierto y avisar al
  usuario.
- **Limpieza mensual:** al agregar una línea, crear la sección del mes si no existe y borrar las
  secciones anteriores al mes pasado. El mes pasado se conserva para detectar cruces en el cambio
  de mes.
- **Revisión programada:** solo lee la lista y no la modifica. Ignora las secciones anteriores al
  mes pasado si todavía no se han borrado.

## 2. Borrador para aprobación (español)

1. Leer de nuevo la fuente completa. No escribir nada que la fuente no diga.
2. Escribir siguiendo `.claude/skills/copy-camilopinzon/` (voz y estructura): qué pasó, qué
   significa, cómo te afecta (positivo y negativo), qué puedes hacer (si aplica) y
   fuente con enlace. Más título, slug, tag, tiempo de lectura, excerpt y 2-4 FAQs.
3. Pasar el texto por `.claude/skills/humanizer/` como última pasada.
4. Guardar el borrador en el scratchpad de la sesión (no en el repo) y mandarlo al usuario.
5. **Aprobación 1.** Aplicar los cambios que pida y repetir hasta tener un "aprobado" explícito.

## 3. Versión final en/es

Crear la carpeta `content/blog/<slug>/`:

- `content.es.html`: el borrador aprobado en HTML semántico (`<h2>`, `<p>`, `<ol>`, `<ul>`, `<a>`).
  Sin `<h1>`, porque el título lo pinta la página. Los enlaces externos llevan
  `target="_blank" rel="noopener noreferrer"`. Tiene que enlazar a la fuente.
- `content.en.html`: versión en inglés escrita de forma nativa (no una traducción literal), con la
  misma estructura y datos. Pasa también por `copy-camilopinzon` y luego por `humanizer`.
- `post.json`: ver `content/blog/_template/post.json`. Un solo slug para los dos idiomas (en
  inglés, kebab-case). `publishedAt` es la fecha de publicación (AAAA-MM-DD). Las FAQs no se
  repiten dentro del HTML: la página las pinta desde `post.json`.
- `post.json` → `linkedin`: el texto del post de LinkedIn (`text`, 2-4 frases) y el idioma del
  artículo al que enlaza (`lang`, por defecto `es`). Hablar como la marca ("publicamos",
  "explicamos"), decir qué pasó y por qué le importa al lector, sin hashtags de relleno ni emojis.
  El enlace al artículo lo agrega el script al final. Pasa por `copy-camilopinzon` y `humanizer`.

Si en el paso 2 hubo `[CONFIRMAR]`, completar con la fuente oficial antes de seguir. Si cambia
algo de fondo, volver a pedir la aprobación 1.

## 4. Imágenes en Claude Design

- Herramienta: Artifact tool, `action: "quickstart"`, `intent: "design"`, y crear el diseño desde el
  tipo "Design" que devuelve. Título: `Blog cover — <slug>`.
- **Siempre dos portadas, cada una en su artboard del mismo canvas:**
  - **Escritorio: 1600×900 px (16:9)** (`Main.dc.html`). Se ve desde 640 px de ancho y es la que
    usan las redes, que la recortan a 1200×630 (~1.9:1): lo importante en la franja central
    (~1600×840), lejos de los bordes de arriba y de abajo.
  - **Móvil: 1080×1350 px (4:5)** (`Mobile.dc.html`). Se ve en pantallas de menos de 640 px. El
    mismo contenido apilado en vertical y más grande; nunca la de escritorio recortada.
- La página muestra cada una entera en un recuadro de su misma proporción (`.post-cover` en
  `app/globals.css`), así que no hay recortes. Los posts sin portada móvil mantienen el diseño
  antiguo de altura fija.
- Estilo Augen Pro: fondo Ghost White `#f2f2f4` o Midnight Ink `#0f1012`, acento único Future Blue
  `#0071e3`, tipografía PP Neue Montreal (o una grotesca similar), mucho espacio negativo. Sin
  logos de terceros ni capturas de sus sitios: representar el tema con formas abstractas o
  tipografía.
- Si el título va en la imagen, que sea corto y en el idioma neutro de la marca. Si hace falta
  texto distinto por idioma, hacer dos portadas y avisar (hoy el CMS guarda una sola).
- Exportar en PNG como `content/blog/<slug>/cover.png` y `content/blog/<slug>/cover-mobile.png`.
  Si el canvas no exporta, renderizar el HTML del artboard con Chrome headless al tamaño exacto
  (`--window-size=1600,900` o `1080,1350`, `--force-device-scale-factor=1`) y revisar el PNG.

## 5. Alt en/es y aprobación de imágenes

- Un alt por idioma en `post.json` (`translations.<lang>.coverImageAlt`): una frase que describa lo
  que se ve, de máximo ~125 caracteres, sin "imagen de"/"image of". Pasa por `copy-camilopinzon` y
  `humanizer`.
- Los alt describen las dos portadas: deben tener el mismo contenido.
- **Aprobación 2.** Presentar las dos portadas (el enlace al diseño y los dos PNG) junto a los dos
  alt. Si el usuario pide cambios, iterar en el mismo artifact de diseño.

## 6. Publicación

1. Validar sin escribir nada:
   `npm run blog:publish -- content/blog/<slug>`
   Muestra títulos y alt en/es, el texto exacto del post de LinkedIn con su enlace, y los
   suscriptores activos y el asunto del newsletter por idioma.
2. Mostrar ese resumen al usuario y pedir la **aprobación 3**: un "publica" explícito. Esa
   aprobación cubre el blog en los dos idiomas, el post de LinkedIn, el newsletter y el commit y
   push de la nota; no hace falta pedir otra.
3. Publicar:
   `npm run blog:publish -- content/blog/<slug> --commit`
   El script, en orden:
   - sube las dos portadas a Cloudinary (`camilopinzon-cms/<slug>` y `<slug>-mobile`); sin
     `cover-mobile.png` no publica;
   - crea `posts/<slug>` en Firestore con `isPublished: true` y las dos traducciones (si el slug ya
     existe, se niega salvo con `--overwrite`);
   - comparte el artículo en LinkedIn (mismo formato que el CMS) y guarda `linkedinPostId` en el
     documento. Si ya tiene `linkedinPostId`, no vuelve a compartir;
   - envía el newsletter a los suscriptores activos, cada uno en su idioma (mismo correo que el
     CMS), y guarda `newsletterSentAt`. Si ya lo tiene, no vuelve a enviar. Con `--overwrite` nunca
     envía, para no anunciar como nuevo un post corregido.
4. Si LinkedIn o el newsletter fallan, el post del blog ya quedó publicado y el otro canal sigue su
   curso. Corregir la causa (por ejemplo, el token `LINKEDIN_ACCESS_TOKEN` vencido) y reintentar
   solo ese canal con `--commit --linkedin-only` o `--commit --newsletter-only`. Un reintento del
   newsletter dentro de las 24 horas no repite el correo a quien ya lo recibió; pasado ese plazo,
   revisar en Resend a quién le llegó antes de reintentar.
5. `--skip-linkedin` y `--skip-newsletter` omiten ese canal, únicamente si el usuario lo pide.
6. Agregar el artículo a `articulos-del-mes.md`, con los temas o hechos que cubre.
7. **Siempre** hacer commit de `content/blog/<slug>/` y de la lista, y push a `origin/main`, sin
   incluir otros cambios pendientes. Antes del push, avisar si hay otros commits sin subir, porque
   un push a `main` despliega producción.

## 7. Verificación

- Las páginas usan `revalidate = 3600`: el post puede tardar hasta una hora en aparecer.
- Revisar `https://camilopinzon.dev/en/blog/<slug>` y `/es/blog/<slug>`: título, portada, alt,
  enlace a la fuente, FAQs y que aparezca en `/en/blog` y `/es/blog`.
- **Revisar en móvil y en escritorio** con el navegador integrado (`resize_window`) a 320, 375,
  768 y 1440 px de ancho: que la portada correcta se vea completa (4:5 por debajo de 640 px, 16:9
  desde 640) y que no haya scroll horizontal. Volver el viewport a `desktop` al terminar.
- Confirmar que el post de LinkedIn salió (el script imprime su id) y cuántos correos del
  newsletter se enviaron (el script lo imprime).
- Informar al usuario con los dos enlaces del blog, el id del post de LinkedIn, los correos
  enviados y el commit subido.
