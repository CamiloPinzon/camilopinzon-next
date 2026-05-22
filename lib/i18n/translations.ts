export type Lang = "en" | "es";

const translations = {
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      services: "Services",
      portfolio: "Success Stories",
      news: "Updates",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      profileLabel: "Profile information",
      aboutLabel: "About us",
      bio: "A dedicated engineering team. We design, build, and scale premium digital products with high performance, accessibility, and clean code at their core.",
      contactLabel: "Contact",
      emailLink: "Send us an email",
      contactBtn: "Contact us",
      eyebrow: "Available for dedicated hiring & corporate contracts · Remote",
      headline1: "We Build",
      headlineEm: "Digital",
      headline2: "Experiences",
      subtext:
        "Front-end web development focused on performance, accessibility, and clean code. We transform ideas into high-impact digital products.",
      btnProjects: "View success stories",
      statYears: "Years of experience",
      statProjects: "Delivered projects",
      statTechs: "Core services",
    },
    techStack: {
      sectionLabel: "Tools & Infrastructure",
      sectionTitle: "Our",
      sectionTitleEm: "Toolset",
      ariaLabel: "Technologies we use",
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
        "Explore our thoughts, tutorials, and experiences on frontend development, UI/UX design, and industry insights.",
      noArticles: "No published articles yet.",
      readTime: "{time} read",
      readArticle: "Read full article",
      featuredBadge: "⭐ Featured",
    },
    news: {
      sectionLabel: "Announcements & Updates",
      sectionTitle: "Latest",
      sectionTitleEm: "News",
      emptyState: "No news announcements posted yet",
    },
    experience: {
      pageTitle: "Our Corporate Track Record",
      pageSubtitle:
        "A detailed look at the professional journey and the organizations our team members have collaborated with.",
    },
    footer: {
      role: "Tech Services",
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
      title: "Brands that trust our work",
      subtitle:
        "We have helped companies create powerful digital experiences. Yours could be next.",
      ariaLabel: "Client brands",
    },
    blogPost: {
      backLink: "← Back to Home",
      faqTitle: "Frequently Asked Questions",
    },
    services: {
      ariaLabel: "Services offered",
      sectionLabel: "Our Services",
      title: "What We",
      titleEm: "Offer",
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
            "We transform static designs into interactive, pixel-perfect code. Fluid and responsive interfaces on any device.",
        },
        {
          title: "Performance & Technical SEO",
          description:
            "Audit and optimization of Core Web Vitals. We improve load speed and accessibility to climb positions in search engines.",
        },
      ],
    },
    portfolio: {
      ariaLabel: "Success Stories",
      sectionLabel: "Success Stories",
      title: "Success",
      titleEm: "Stories",
      viewProject: "View Case Study",
      items: [
        {
          title: "AI-Powered Platform & CMS",
          description:
            "Designed and engineered a high-performance custom web application and CMS using Next.js, React 19, and TypeScript. Implemented an autonomous business assistant powered by Google Gemini Flash and live RAG context.",
          tags: ["Next.js", "React 19", "Gemini AI", "TypeScript", "SCSS"],
        },
        {
          title: "Google Wallet / Pay Forms",
          description:
            "We engineered frontend forms and managed CMS content for the global Google Wallet platform. We resolved complex architectural challenges like full RTL (Right-to-Left) and LTR layout support.",
          tags: ["TypeScript", "Frontend Forms", "RTL/LTR", "CMS"],
        },
        {
          title: "Disney Cruise Line UI",
          description:
            "We developed critical UI components for the official cruise booking platform. Led the migration of legacy JavaScript codebases into a modern, robust React and TypeScript architecture.",
          tags: ["React", "TypeScript", "UI Components", "Migration"],
        },
        {
          title: "Interactive Experience — Chocolates Jet",
          description:
            "We digitized Colombia's most iconic sticker album into an interactive web experience. Engineered gamification mechanics, virtual transactions, and user engagement loops.",
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
        "We are currently available for corporate contracts, freelance development, and dedicated team hiring. If you have a project that needs specialized software engineering, we'd love to hear about it.",
      nameLabel: "Your Name",
      namePlaceholder: "John Doe",
      emailLabel: "Your Email",
      emailPlaceholder: "john@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell us about your project...",
      submitBtn: "Send Message",
      successMsg: "Message sent successfully! We will contact you soon.",
      successSub: "Check your inbox for a confirmation email.",
      sending: "Sending...",
      errorDefault: "Error sending message.",
      errorUnexpected: "Unexpected error sending message.",
    },
    emails: {
      contactSubject: "We have received your message",
      contactGreeting: "Hello, {name}!",
      contactThanks: "Thanks for reaching out. This email is to confirm that we have successfully received your message.",
      contactFollowUp: "We will review your inquiry and get back to you as soon as possible.",
      contactSignOff: "Best regards,",
      newsletterSubject: "Welcome to our Newsletter!",
      newsletterGreeting: "Hello!",
      newsletterThanks: "Thank you for subscribing to our Newsletter.",
      newsletterFollowUp: "From now on, you will receive our latest articles and exclusive content directly in your inbox.",
      newsletterSignOff: "Best regards,",
      newPostSubject: "New Post: {title}",
      newPostGreeting: "Hello!",
      newPostMessage: "We just published a new article on our blog: '{title}'.",
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
      title: "Camilo Pinzón — Tech Services & Web Development",
      description: "Custom web development agency specializing in React, Next.js, and high-impact digital solutions. Explore our success stories, services, and corporate expertise.",
      keywords: ["Camilo Pinzon", "Web Development Agency", "Software Development Company", "React", "Next.js", "JavaScript", "TypeScript", "Colombia", "Remote"],
      ogTitle: "Camilo Pinzón — High-Performance Web Services",
      ogDescription: "Creating robust software architectures and stunning visual interfaces. Available for dedicated hiring and corporate contracts worldwide.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      experience: "Trayectoria",
      services: "Servicios",
      portfolio: "Casos de Éxito",
      news: "Novedades",
      blog: "Blogs",
      contact: "Contacto",
    },
    hero: {
      profileLabel: "Información de perfil",
      aboutLabel: "Sobre nosotros",
      bio: "Equipo dedicado al desarrollo web premium. Diseñamos, construimos y escalamos productos digitales de alto rendimiento con código limpio y accesibilidad nativa.",
      contactLabel: "Contacto",
      emailLink: "Envíanos un correo",
      contactBtn: "Contáctanos",
      eyebrow: "Disponibles para contratación dedicada & servicios corporativos · Remoto",
      headline1: "Construimos",
      headlineEm: "Experiencias",
      headline2: "Digitales",
      subtext:
        "Desarrollo web front-end con enfoque en rendimiento, accesibilidad y código limpio. Transformamos ideas en productos digitales de alto impacto.",
      btnProjects: "Ver casos de éxito",
      statYears: "Años de experiencia",
      statProjects: "Proyectos entregados",
      statTechs: "Servicios principales",
    },
    techStack: {
      sectionLabel: "Herramientas & Infraestructura",
      sectionTitle: "Nuestras",
      sectionTitleEm: "Herramientas",
      ariaLabel: "Tecnologías que utilizamos",
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
        "Explora nuestros pensamientos, tutoriales y experiencias sobre desarrollo frontend, diseño UI/UX y novedades del sector.",
      noArticles: "No hay artículos publicados aún.",
      readTime: "{time} lectura",
      readArticle: "Leer artículo completo",
      featuredBadge: "⭐ Destacado",
    },
    news: {
      sectionLabel: "Anuncios & Novedades",
      sectionTitle: "Últimas",
      sectionTitleEm: "Noticias",
      emptyState: "No hay noticias publicadas aún",
    },
    experience: {
      pageTitle: "Nuestra Trayectoria Corporativa",
      pageSubtitle:
        "Un vistazo detallado a la trayectoria profesional y las organizaciones con las que nuestro equipo ha colaborado.",
    },
    footer: {
      role: "Servicios Tecnológicos",
      navLabel: "Pie de página",
      links: ["Inicio", "Experiencia", "Servicios", "Blog", "Contacto"],
      newsletterLabel: "Suscríbete para actualizaciones",
      newsletterSub: "Manténte al tanto con los últimos blogs.",
      newsletterBtn: "Suscribir",
      newsletterPlaceholder: "tu@correo.com",
      newsletterSuccess: "¡Suscrito!",
      newsletterError: "Error al suscribirse. Intenta de nuevo.",
    },
    brands: {
      title: "Marcas que confían en nuestro trabajo",
      subtitle:
        "Hemos ayudado a empresas a crear experiencias digitales poderosas. La tuya podría ser la siguiente.",
      ariaLabel: "Marcas clientes",
    },
    blogPost: {
      backLink: "← Volver al Inicio",
      faqTitle: "Preguntas Frecuentes",
    },
    services: {
      ariaLabel: "Servicios ofrecidos",
      sectionLabel: "Nuestros Servicios",
      title: "Lo que",
      titleEm: "Ofrecemos",
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
      ariaLabel: "Casos de Éxito",
      sectionLabel: "Casos de Éxito",
      title: "Casos de",
      titleEm: "Éxito",
      viewProject: "Ver Caso de Éxito",
      items: [
        {
          title: "Plataforma IA & CMS",
          description:
            "Diseño y desarrollo de esta plataforma web de alto rendimiento con Next.js, React 19 y TypeScript. Integración de un asistente virtual autónomo basado en Google Gemini Flash y contexto RAG para atención y cotizaciones.",
          tags: ["Next.js", "React 19", "Gemini AI", "TypeScript", "SCSS"],
        },
        {
          title: "Google Wallet / Pay Forms",
          description:
            "Maquetación de formularios frontend y administración en CMS propio para la plataforma global de Google Wallet. Resolución de retos complejos de accesibilidad y diseño como el soporte integral para layouts RTL y LTR.",
          tags: ["TypeScript", "Formularios UI", "RTL/LTR", "CMS"],
        },
        {
          title: "Disney Cruise Line UI",
          description:
            "Desarrollo de componentes UI críticos para la plataforma oficial de reservas de Disney Cruise Line. Lideramos la migración de bases de código JavaScript legacy hacia una arquitectura moderna con React y TypeScript.",
          tags: ["React", "TypeScript", "Componentes UI", "Migración"],
        },
        {
          title: "Experiencia Interactiva — Chocolates Jet",
          description:
            "Digitalización del icónico álbum de cromos de Chocolates Jet a una experiencia web interactiva. Implementamos mecánicas de gamificación, ludificación y un sistema de transacciones virtuales.",
          tags: ["PHP", "JavaScript", "Gamification", "MySQL"],
        },
      ],
    },
    contact: {
      ariaLabel: "Formulario de contacto",
      sectionLabel: "Contáctanos",
      title: "Trabajemos",
      titleEm: "Juntos",
      description:
        "Estamos disponibles para contratos corporativos, desarrollo de proyectos y contratación dedicada. Si tienes una iniciativa que requiere de ingeniería especializada, nos encantaría conocerla.",
      nameLabel: "Tu Nombre",
      namePlaceholder: "Juan Pérez",
      emailLabel: "Tu Correo",
      emailPlaceholder: "juan@ejemplo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntanos sobre tu proyecto...",
      submitBtn: "Enviar Mensaje",
      successMsg: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
      successSub: "Revisa tu bandeja de entrada para el correo de confirmación.",
      sending: "Enviando...",
      errorDefault: "Error al enviar el mensaje.",
      errorUnexpected: "Error inesperado al enviar el mensaje.",
    },
    emails: {
      contactSubject: "Hemos recibido tu mensaje",
      contactGreeting: "¡Hola, {name}!",
      contactThanks: "Gracias por escribirnos. Este correo es para confirmarte que hemos recibido tu mensaje correctamente.",
      contactFollowUp: "Estaremos revisando tu consulta y nos pondremos en contacto contigo lo más pronto posible.",
      contactSignOff: "Un saludo,",
      newsletterSubject: "¡Bienvenido a nuestro Newsletter!",
      newsletterGreeting: "¡Hola!",
      newsletterThanks: "Gracias por suscribirte a nuestro Newsletter.",
      newsletterFollowUp: "De ahora en adelante, recibirás nuestros nuevos artículos y contenido exclusivo directamente en tu bandeja de entrada.",
      newsletterSignOff: "Un saludo,",
      newPostSubject: "Nuevo Artículo: {title}",
      newPostGreeting: "¡Hola!",
      newPostMessage: "Acabamos de publicar un nuevo artículo en nuestro blog: '{title}'.",
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
      title: "Camilo Pinzón — Servicios Tecnológicos & Desarrollo Web",
      description: "Empresa de desarrollo web y soluciones de software de alto impacto. Nos especializamos en React, Next.js y experiencias digitales premium.",
      keywords: ["Camilo Pinzon", "Agencia de Desarrollo Web", "Empresa de Software", "React", "Next.js", "JavaScript", "TypeScript", "Colombia", "Remoto"],
      ogTitle: "Camilo Pinzón — Servicios Tecnológicos Premium",
      ogDescription: "Creando arquitecturas de software robustas e interfaces visuales deslumbrantes. Disponibles para contratación dedicada y proyectos corporativos.",
    },
  },
};

// Helper: retorna las traducciones del idioma pedido, con fallback a 'en'
export function getTranslations(lang: string) {
  return translations[lang as Lang] ?? translations["en"];
}
