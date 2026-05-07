export type Lang = "en" | "es";

const translations = {
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      downloadCv: "Download CV",
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
      btnCv: "Download CV",
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
    },
    brands: {
      title: "Brands that trust my work",
      subtitle: "I have helped companies create powerful digital experiences. Yours could be next.",
      ariaLabel: "Client brands",
    },
    blogPost: {
      backLink: "← Back to Home",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      experience: "Experiencia",
      services: "Servicios",
      portfolio: "Portafolio",
      blog: "Blogs",
      downloadCv: "Descargar CV",
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
      btnCv: "Descargar CV",
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
    },
    brands: {
      title: "Marcas que confían en mi trabajo",
      subtitle:
        "He ayudado a empresas a crear experiencias digitales poderosas. La tuya podría ser la siguiente.",
      ariaLabel: "Marcas clientes",
    },
    blogPost: {
      backLink: "← Volver al Inicio",
    },
  },
};

// Helper: retorna las traducciones del idioma pedido, con fallback a 'en'
export function getTranslations(lang: string) {
  return translations[lang as Lang] ?? translations["en"];
}
