"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function seedNewsAction() {
  try {
    const initialNews = [
      {
        id: "news-google-wallet",
        image: "/portfolio/google-pay.png",
        publishedAt: "2026-05-20",
        isPublished: true,
        translations: {
          en: {
            title: "Strategic Alliance with Google Wallet",
            content: "We are excited to announce our strategic partnership with Google Wallet to optimize their global Next.js user interface components and accessibility controls.",
          },
          es: {
            title: "Alianza Estratégica con Google Wallet",
            content: "Nos complace anunciar nuestra alianza de desarrollo frontend con el equipo global de Google Wallet para optimizar sus flujos de interfaz y accesibilidad en Next.js.",
          }
        }
      },
      {
        id: "news-ai-recruiter",
        image: "/social/og-image.png",
        publishedAt: "2026-05-15",
        isPublished: true,
        translations: {
          en: {
            title: "AI Business Agent Launched in Production",
            content: "Our personal AI assistant powered by Google Gemini 1.5 Flash is officially live, handling real-time customer project inquiries and live quoting.",
          },
          es: {
            title: "Asistente de Negocios IA en Producción",
            content: "Lanzamos oficialmente nuestro agente virtual autónomo impulsado por Google Gemini 1.5 Flash para responder consultas de proyectos y cotizaciones en tiempo real.",
          }
        }
      },
      {
        id: "news-disney-cruise-migration",
        image: "/portfolio/disney-cruise.png",
        publishedAt: "2026-05-10",
        isPublished: true,
        translations: {
          en: {
            title: "React 19 & Compiler Modernization",
            content: "Completed our technical migration for key enterprise clients, incorporating React Server Components and React Compiler logic for enhanced performance.",
          },
          es: {
            title: "Modernización Técnica a React 19",
            content: "Culminamos con éxito la migración frontend para nuestros clientes principales, adoptando React Server Components y el nuevo compilador para optimizar velocidad.",
          }
        }
      }
    ];

    for (const item of initialNews) {
      const { id, ...data } = item;
      await adminDb.collection("news").doc(id).set(data, { merge: true });
    }

    return { success: true };
  } catch (error) {
    console.error("Error seeding news:", error);
    return { success: false, error: String(error) };
  }
}

export async function seedProjectsAction() {
  try {
    const initialProjects = [
      {
        id: "portfolio-ia",
        title: "AI-Powered Portfolio & CMS",
        techStack: "Next.js, React 19, Gemini AI, TypeScript, SCSS",
        coverImage: "/social/og-image.png",
        order: 40,
        translations: {
          en: {
            title: "AI-Powered Portfolio & CMS",
            description: "Designed and engineered a high-performance personal web application using Next.js, React 19, and TypeScript. Implemented an autonomous recruitment assistant powered by Google Gemini Flash and live RAG context.",
          },
          es: {
            title: "Portafolio Personal & Asistente IA",
            description: "Diseño y desarrollo full-stack de esta plataforma web personal de alto rendimiento con Next.js, React 19 y TypeScript. Integración de un asistente virtual autónomo de reclutamiento basado en Google Gemini Flash y contexto RAG.",
          }
        }
      },
      {
        id: "google-wallet",
        title: "Google Wallet / Pay",
        techStack: "TypeScript, Frontend Forms, RTL/LTR, CMS",
        coverImage: "/portfolio/google-pay.png",
        order: 30,
        translations: {
          en: {
            title: "Google Wallet / Pay",
            description: "Engineered frontend forms and managed CMS content for the global Google Wallet platform. Overcame complex architectural challenges like full RTL (Right-to-Left) and LTR layout support.",
          },
          es: {
            title: "Google Wallet / Pay",
            description: "Maquetación de formularios frontend y administración en CMS propio. Resolución de retos complejos de accesibilidad y diseño como el soporte integral para layouts RTL y LTR.",
          }
        }
      },
      {
        id: "disney-cruise",
        title: "Disney Cruise Line",
        techStack: "React, TypeScript, UI Components, Migration",
        coverImage: "/portfolio/disney-cruise.png",
        order: 20,
        translations: {
          en: {
            title: "Disney Cruise Line",
            description: "Developed critical UI components for the official cruise booking platform. Led the migration of legacy JavaScript codebases into a modern, robust React and TypeScript architecture.",
          },
          es: {
            title: "Disney Cruise Line",
            description: "Desarrollo de componentes UI críticos para la plataforma oficial de reservas. Participación en la migración de bases de código JavaScript legacy hacia una arquitectura moderna con React y TypeScript.",
          }
        }
      },
      {
        id: "chocolates-jet",
        title: "Planeta Sorprendente — Chocolates Jet",
        techStack: "PHP, JavaScript, Gamification, MySQL",
        coverImage: "/portfolio/chocolates-jet.png",
        order: 10,
        translations: {
          en: {
            title: "Planeta Sorprendente — Chocolates Jet",
            description: "Digitized Colombia's most iconic sticker album into an interactive web experience. Engineered gamification mechanics, virtual transactions, and user engagement loops.",
          },
          es: {
            title: "Planeta Sorprendente — Chocolates Jet",
            description: "Migración del icónico álbum de cromos a una experiencia web interactiva. Implementación de mecánicas de gamificación, ludificación y un sistema de transacciones virtuales.",
          }
        }
      }
    ];

    for (const item of initialProjects) {
      const { id, ...data } = item;
      await adminDb.collection("projects").doc(id).set(data, { merge: true });
    }

    return { success: true };
  } catch (error) {
    console.error("Error seeding projects:", error);
    return { success: false, error: String(error) };
  }
}

export async function saveCmsDocumentAction(
  collectionId: string,
  docId: string | null,
  isNew: boolean,
  data: any
) {
  try {
    if (isNew) {
      const docRef = await adminDb.collection(collectionId).add(data);
      return { success: true, id: docRef.id };
    } else {
      if (!docId) throw new Error("Document ID is required for editing");
      await adminDb.collection(collectionId).doc(docId).set(data, { merge: true });
      return { success: true };
    }
  } catch (error) {
    console.error("Error saving document via server action:", error);
    return { success: false, error: String(error) };
  }
}

export async function deleteCmsDocumentAction(collectionId: string, docId: string) {
  try {
    await adminDb.collection(collectionId).doc(docId).delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting document via server action:", error);
    return { success: false, error: String(error) };
  }
}

function serializeFirestoreData(data: any): any {
  if (data === null || data === undefined) return data;
  
  // Handle Firestore Timestamp
  if (typeof data.toDate === "function") {
    return data.toDate().toISOString();
  }
  
  // Handle JS Date
  if (data instanceof Date) {
    return data.toISOString();
  }
  
  // Handle Array
  if (Array.isArray(data)) {
    return data.map(serializeFirestoreData);
  }
  
  // Handle Object
  if (typeof data === "object") {
    const serialized: any = {};
    for (const key of Object.keys(data)) {
      serialized[key] = serializeFirestoreData(data[key]);
    }
    return serialized;
  }
  
  return data;
}

export async function getCmsDocumentsAction(collectionId: string) {
  try {
    const snapshot = await adminDb.collection(collectionId).get();
    const docsData = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...serializeFirestoreData(docSnap.data()),
    }));
    return { success: true, data: docsData };
  } catch (error) {
    console.error("Error fetching documents via server action:", error);
    return { success: false, error: String(error) };
  }
}

export async function getCmsDocumentAction(collectionId: string, docId: string) {
  try {
    const docSnap = await adminDb.collection(collectionId).doc(docId).get();
    if (!docSnap.exists) {
      return { success: false, error: "Document not found" };
    }
    return {
      success: true,
      data: {
        id: docSnap.id,
        ...serializeFirestoreData(docSnap.data()),
      },
    };
  } catch (error) {
    console.error("Error fetching document via server action:", error);
    return { success: false, error: String(error) };
  }
}

