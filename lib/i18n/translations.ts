export type Lang = "en" | "es";

const translations = {
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      profileLabel: "Profile information",
      aboutLabel: "About me",
      bio: "Self-taught and dedicated. Web developer with the ability to work under pressure and a great facility for teamwork, both locally and remotely.",
      contactLabel: "Contact",
      emailLink: "Send me an email",
      contactBtn: "Contact me",
      eyebrow: "Available for projects · Colombia & Remote",
      headline1: "I Build",
      headlineEm: "Digital",
      headline2: "Experiences",
      subtext:
        "Front-end web development focused on performance, accessibility, and clean code. I transform ideas into high-impact digital products.",
      btnProjects: "View projects",
      statYears: "Years of experience",
      statProjects: "Delivered projects",
      statTechs: "Mastered technologies",
    },
    techStack: {
      sectionLabel: "Tools & Technologies",
      sectionTitle: "Tech",
      sectionTitleEm: "Stack",
      ariaLabel: "Technologies I master",
    },
    blog: {
      sectionLabel: "Content & Learning",
      sectionTitle: "Latest",
      sectionTitleEm: "blog posts",
      filterAll: "All",
      emptyState: "No articles in this category yet",
      viewAll: "View all",
      pageTitle: "The Blog",
      pageSubtitle:
        "Explore my thoughts, tutorials, and experiences on frontend development, UI/UX design, and professional growth.",
      noArticles: "No published articles yet.",
      readTime: "{time} read",
      readArticle: "Read full article",
      featuredBadge: "⭐ Featured",
    },
    experience: {
      pageTitle: "Professional Experience",
      pageSubtitle:
        "A detailed look at my professional journey, the challenges I have overcome, and the companies I have collaborated with.",
    },
    footer: {
      role: "Web Developer",
      navLabel: "Footer navigation",
      links: ["Home", "Experience", "Services", "Blog", "Contact"],
      newsletterLabel: "Subscribe for updates",
      newsletterSub: "Stay updated with the latest blog posts.",
      newsletterBtn: "Subscribe",
      newsletterPlaceholder: "your@email.com",
      newsletterSuccess: "Subscribed!",
      newsletterError: "Error subscribing. Please try again.",
    },
    brands: {
      title: "Brands that trust my work",
      subtitle:
        "I have helped companies create powerful digital experiences. Yours could be next.",
      ariaLabel: "Client brands",
    },
    blogPost: {
      backLink: "← Back to Home",
      faqTitle: "Frequently Asked Questions",
    },
    services: {
      ariaLabel: "Services offered",
      sectionLabel: "My Services",
      title: "What I",
      titleEm: "Can Do",
      learnMore: "Learn more →",
      items: [
        {
          title: "Web Applications (SaaS)",
          description:
            "Development of robust and scalable platforms with React and Next.js. Focused on high performance and complex logic.",
        },
        {
          title: "WordPress Development",
          description:
            "Creation of corporate sites and self-manageable stores. Custom themes, fast and optimized for conversion.",
        },
        {
          title: "Frontend & UI Development",
          description:
            "I transform static designs into interactive, pixel-perfect code. Fluid and responsive interfaces on any device.",
        },
        {
          title: "Performance & Technical SEO",
          description:
            "Audit and optimization of Core Web Vitals. I improve load speed and accessibility to climb positions in search engines.",
        },
      ],
    },
    portfolio: {
      ariaLabel: "My Portfolio",
      sectionLabel: "Featured Work",
      title: "Selected",
      titleEm: "Projects",
      viewProject: "View Project",
      items: [
        {
          title: "AI-Powered Portfolio & CMS",
          description:
            "Designed and engineered a high-performance personal web application using Next.js, React 19, and TypeScript. Implemented an autonomous recruitment assistant powered by Google Gemini Flash and live RAG context.",
          tags: ["Next.js", "React 19", "Gemini AI", "TypeScript", "SCSS"],
        },
        {
          title: "Google Wallet / Pay",
          description:
            "Engineered frontend forms and managed CMS content for the global Google Wallet platform. Overcame complex architectural challenges like full RTL (Right-to-Left) and LTR layout support.",
          tags: ["TypeScript", "Frontend Forms", "RTL/LTR", "CMS"],
        },
        {
          title: "Disney Cruise Line",
          description:
            "Developed critical UI components for the official cruise booking platform. Led the migration of legacy JavaScript codebases into a modern, robust React and TypeScript architecture.",
          tags: ["React", "TypeScript", "UI Components", "Migration"],
        },
        {
          title: "Planeta Sorprendente — Chocolates Jet",
          description:
            "Digitized Colombia's most iconic sticker album into an interactive web experience. Engineered gamification mechanics, virtual transactions, and user engagement loops.",
          tags: ["PHP", "JavaScript", "Gamification", "MySQL"],
        },
      ],
    },
    contact: {
      ariaLabel: "Contact form",
      sectionLabel: "Get In Touch",
      title: "Let's",
      titleEm: "Work Together",
      description:
        "I'm currently available for freelance work or full-time roles. If you have a project that needs some creative magic, I'd love to hear about it.",
      nameLabel: "Your Name",
      namePlaceholder: "John Doe",
      emailLabel: "Your Email",
      emailPlaceholder: "john@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project...",
      submitBtn: "Send Message",
      successMsg: "Message sent successfully! We will contact you soon.",
      successSub: "Check your inbox for a confirmation email.",
      sending: "Sending...",
      errorDefault: "Error sending message.",
      errorUnexpected: "Unexpected error sending message.",
    },
    emails: {
      contactSubject: "I have received your message",
      contactGreeting: "Hello, {name}!",
      contactThanks: "Thanks for reaching out. This email is to confirm that I have successfully received your message.",
      contactFollowUp: "I will review your inquiry and get back to you as soon as possible.",
      contactSignOff: "Best regards,",
      newsletterSubject: "Welcome to my Newsletter!",
      newsletterGreeting: "Hello!",
      newsletterThanks: "Thank you for subscribing to my Newsletter.",
      newsletterFollowUp: "From now on, you will receive my latest articles and exclusive content directly in your inbox.",
      newsletterSignOff: "Best regards,",
      newPostSubject: "New Post: {title}",
      newPostGreeting: "Hello!",
      newPostMessage: "I just published a new article on my blog: '{title}'.",
      newPostCta: "Read the full article",
      unsubscribe: "Unsubscribe from these emails",
    },
    blogNewsletter: {
      title: "Did you like the content?",
      subtitle: "Receive new articles directly in your inbox. No spam, only learning.",
      placeholder: "your@email.com",
      btn: "Subscribe",
      successTitle: "Subscription successful!",
      successSub: "Check your inbox for a welcome email.",
      errorDefault: "Error subscribing.",
      errorUnexpected: "Unexpected error.",
      ariaLabel: "Blog subscription",
    },
    seo: {
      title: "Camilo Pinzón — Frontend & Web Developer",
      description: "Frontend developer specializing in React, Next.js, and high-impact digital experiences. Explore my professional portfolio, interactive projects, and personal blog.",
      keywords: ["Camilo Pinzon", "Frontend Developer", "Web Development", "React", "Next.js", "JavaScript", "TypeScript", "Colombia", "Remote"],
      ogTitle: "Camilo Pinzón — Premium Web Experiences",
      ogDescription: "Creating robust software architectures and stunning visual interfaces. Available for remote web development projects worldwide.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      experience: "Experiencia",
      services: "Servicios",
      portfolio: "Portafolio",
      blog: "Blogs",
      contact: "Contacto",
    },
    hero: {
      profileLabel: "Información de perfil",
      aboutLabel: "Sobre mí",
      bio: "Autodidacta y dedicado. Desarrollador web con capacidad para asimilar el trabajo bajo presión y gran facilidad para el trabajo en equipo, ya sea de forma local o remota.",
      contactLabel: "Contacto",
      emailLink: "Envíame un correo",
      contactBtn: "Contáctame",
      eyebrow: "Disponible para proyectos · Colombia & Remoto",
      headline1: "Construyo",
      headlineEm: "Experiencias",
      headline2: "Digitales",
      subtext:
        "Desarrollo web front-end con enfoque en performance, accesibilidad y código limpio. Transformo ideas en productos digitales de alto impacto.",
      btnProjects: "Ver proyectos",
      statYears: "Años de experiencia",
      statProjects: "Proyectos entregados",
      statTechs: "Tecnologías dominadas",
    },
    techStack: {
      sectionLabel: "Herramientas & Tecnologías",
      sectionTitle: "Stack",
      sectionTitleEm: "Tecnológico",
      ariaLabel: "Tecnologías que domino",
    },
    blog: {
      sectionLabel: "Contenido & Aprendizaje",
      sectionTitle: "Últimas publicaciones",
      sectionTitleEm: "del blog",
      filterAll: "Todos",
      emptyState: "No hay artículos en esta categoría aún",
      viewAll: "Ver todos",
      pageTitle: "El Blog",
      pageSubtitle:
        "Explora mis pensamientos, tutoriales y experiencias sobre desarrollo frontend, diseño UI/UX y crecimiento profesional.",
      noArticles: "No hay artículos publicados aún.",
      readTime: "{time} lectura",
      readArticle: "Leer artículo completo",
      featuredBadge: "⭐ Destacado",
    },
    experience: {
      pageTitle: "Experiencia Profesional",
      pageSubtitle:
        "Un vistazo detallado a mi trayectoria profesional, los retos que he superado y las empresas con las que he colaborado.",
    },
    footer: {
      role: "Web Developer",
      navLabel: "Pie de página",
      links: ["Inicio", "Experiencia", "Servicios", "Blog", "Contacto"],
      newsletterLabel: "Suscríbete para actualizaciones",
      newsletterSub: "Manténte actualizado con los últimos blogs.",
      newsletterBtn: "Suscribir",
      newsletterPlaceholder: "tu@correo.com",
      newsletterSuccess: "¡Suscrito!",
      newsletterError: "Error al suscribirse. Intenta de nuevo.",
    },
    brands: {
      title: "Marcas que confían en mi trabajo",
      subtitle:
        "He ayudado a empresas a crear experiencias digitales poderosas. La tuya podría ser la siguiente.",
      ariaLabel: "Marcas clientes",
    },
    blogPost: {
      backLink: "← Volver al Inicio",
      faqTitle: "Preguntas Frecuentes",
    },
    services: {
      ariaLabel: "Servicios ofrecidos",
      sectionLabel: "Mis Servicios",
      title: "Lo que",
      titleEm: "Ofrezco",
      learnMore: "Ver detalles →",
      items: [
        {
          title: "Aplicaciones Web (SaaS)",
          description:
            "Desarrollo de plataformas robustas y escalables con React y Next.js. Enfocado en alto rendimiento y lógica compleja.",
        },
        {
          title: "Desarrollo WordPress",
          description:
            "Creación de sitios corporativos y tiendas autogestionables. Temas a medida, rápidos y optimizados para conversión.",
        },
        {
          title: "Frontend & UI Development",
          description:
            "Transformo diseños estáticos en código interactivo y pixel-perfect. Interfaces fluidas y responsivas en cualquier dispositivo.",
        },
        {
          title: "Performance & SEO Técnico",
          description:
            "Auditoría y optimización de Core Web Vitals. Mejoro la velocidad de carga y accesibilidad para escalar posiciones en Google.",
        },
      ],
    },
    portfolio: {
      ariaLabel: "Mi Portafolio",
      sectionLabel: "Trabajo Destacado",
      title: "Proyectos",
      titleEm: "Seleccionados",
      viewProject: "Ver Proyecto",
      items: [
        {
          title: "Portafolio Personal & Asistente IA",
          description:
            "Diseño y desarrollo full-stack de esta plataforma web personal de alto rendimiento con Next.js, React 19 y TypeScript. Integración de un asistente virtual autónomo de reclutamiento basado en Google Gemini Flash y contexto RAG.",
          tags: ["Next.js", "React 19", "Gemini AI", "TypeScript", "SCSS"],
        },
        {
          title: "Google Wallet / Pay",
          description:
            "Maquetación de formularios frontend y administración en CMS propio. Resolución de retos complejos de accesibilidad y diseño como el soporte integral para layouts RTL y LTR.",
          tags: ["TypeScript", "Formularios UI", "RTL/LTR", "CMS"],
        },
        {
          title: "Disney Cruise Line",
          description:
            "Desarrollo de componentes UI críticos para la plataforma oficial de reservas. Participación en la migración de bases de código JavaScript legacy hacia una arquitectura moderna con React y TypeScript.",
          tags: ["React", "TypeScript", "Componentes UI", "Migración"],
        },
        {
          title: "Planeta Sorprendente — Chocolates Jet",
          description:
            "Migración del icónico álbum de cromos a una experiencia web interactiva. Implementación de mecánicas de gamificación, ludificación y un sistema de transacciones virtuales.",
          tags: ["PHP", "JavaScript", "Gamificación", "MySQL"],
        },
      ],
    },
    contact: {
      ariaLabel: "Formulario de contacto",
      sectionLabel: "Contáctame",
      title: "Trabajemos",
      titleEm: "Juntos",
      description:
        "Actualmente estoy disponible para proyectos freelance o roles full-time. Si tienes un proyecto que necesita un toque mágico, me encantaría escucharlo.",
      nameLabel: "Tu Nombre",
      namePlaceholder: "Juan Pérez",
      emailLabel: "Tu Correo",
      emailPlaceholder: "juan@ejemplo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      submitBtn: "Enviar Mensaje",
      successMsg: "¡Mensaje enviado con éxito! Te contactaremos pronto.",
      successSub: "Revisa tu bandeja de entrada para el correo de confirmación.",
      sending: "Enviando...",
      errorDefault: "Error al enviar el mensaje.",
      errorUnexpected: "Error inesperado al enviar el mensaje.",
    },
    emails: {
      contactSubject: "He recibido tu mensaje",
      contactGreeting: "¡Hola, {name}!",
      contactThanks: "Gracias por escribirme. Este correo es para confirmarte que he recibido tu mensaje correctamente.",
      contactFollowUp: "Estaré revisando tu consulta y me pondré en contacto contigo lo más pronto posible.",
      contactSignOff: "Un saludo,",
      newsletterSubject: "¡Bienvenido a mi Newsletter!",
      newsletterGreeting: "¡Hola!",
      newsletterThanks: "Gracias por suscribirte a mi Newsletter.",
      newsletterFollowUp: "De ahora en adelante, recibirás mis nuevos artículos y contenido exclusivo directamente en tu bandeja de entrada.",
      newsletterSignOff: "Un saludo,",
      newPostSubject: "Nuevo Artículo: {title}",
      newPostGreeting: "¡Hola!",
      newPostMessage: "Acabo de publicar un nuevo artículo en mi blog: '{title}'.",
      newPostCta: "Leer el artículo completo",
      unsubscribe: "Darse de baja de estos correos",
    },
    blogNewsletter: {
      title: "¿Te gustó el contenido?",
      subtitle: "Recibe los nuevos artículos directo en tu correo. Sin spam, solo aprendizaje.",
      placeholder: "tu@correo.com",
      btn: "Suscribirme",
      successTitle: "¡Suscripción exitosa!",
      successSub: "Revisa tu correo para el mensaje de bienvenida.",
      errorDefault: "Error al suscribirte.",
      errorUnexpected: "Error inesperado.",
      ariaLabel: "Suscripción al blog",
    },
    seo: {
      title: "Camilo Pinzón — Desarrollador Web & Frontend",
      description: "Desarrollador frontend especializado en React, Next.js y experiencias digitales de alto impacto. Explora mi portafolio profesional, proyectos interactivos y blog personal.",
      keywords: ["Camilo Pinzon", "Desarrollador Frontend", "Desarrollo Web", "React", "Next.js", "JavaScript", "TypeScript", "Colombia", "Remoto"],
      ogTitle: "Camilo Pinzón — Experiencias Web Premium",
      ogDescription: "Creando arquitecturas de software robustas e interfaces visuales deslumbrantes. Disponible para proyectos de desarrollo web remoto a nivel global.",
    },
  },
};

// Helper: retorna las traducciones del idioma pedido, con fallback a 'en'
export function getTranslations(lang: string) {
  return translations[lang as Lang] ?? translations["en"];
}
