"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { cmsConfig } from "@/lib/cms/config";
import Link from "next/link";

interface DocumentItem {
  id: string;
  translations?: Record<string, Record<string, string>>;
  [key: string]: unknown;
}

export default function CollectionList() {
  const params = useParams();
  const collectionId = params.collectionId as string;

  const schema = cmsConfig.collections.find((c) => c.id === collectionId);

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schema) return;

    const fetchDocs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, schema.id));
        const docsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docsData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [schema]);

  if (!schema) return <div>Collection not found</div>;

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteDoc(doc(db, schema.id, id));
      setDocuments(documents.filter((d) => d.id !== id));
    }
  };

  // Determine the primary field to display as the row title
  const primaryField = schema.fields[0];

  const handleSeedProjects = async () => {
    if (!confirm("¿Deseas inicializar la base de datos de proyectos con los 4 ítems estándar del catálogo?")) return;
    setLoading(true);
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
        await setDoc(doc(db, "projects", id), data);
      }

      const querySnapshot = await getDocs(collection(db, "projects"));
      const docsData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocuments(docsData);
      alert("¡Proyectos inicializados con éxito!");
    } catch (err) {
      console.error(err);
      alert("Error al inicializar proyectos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeedNews = async () => {
    if (!confirm("¿Deseas inicializar la base de datos de noticias con 3 ejemplos?")) return;
    setLoading(true);
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
        await setDoc(doc(db, "news", id), data);
      }

      const querySnapshot = await getDocs(collection(db, "news"));
      const docsData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocuments(docsData);
      alert("¡Noticias inicializadas con éxito!");
    } catch (err) {
      console.error(err);
      alert("Error al inicializar noticias.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#2b3674",
              margin: 0,
            }}
          >
            {schema.name}
          </h1>
          <p style={{ color: "#a3aed1", margin: "4px 0 0 0" }}>
            {schema.description}
          </p>
        </div>
        <Link
          href={`/admin/collections/${schema.id}/new`}
          style={{
            backgroundColor: "#4318ff",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          + Create {schema.singularName}
        </Link>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 24px rgba(112, 144, 176, 0.08)",
        }}
      >
        {loading ? (
          <p style={{ color: "#a3aed1" }}>Loading...</p>
        ) : documents.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "48px 0", color: "#a3aed1" }}
          >
            <p style={{ marginBottom: "16px" }}>
              No {schema.name.toLowerCase()} found. Click the button above to
              create one.
            </p>
            {schema.id === "projects" && (
              <button
                onClick={handleSeedProjects}
                style={{
                  backgroundColor: "#34c759",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                ✨ Inicializar BD con tus 4 Proyectos Estándar
              </button>
            )}
            {schema.id === "news" && (
              <button
                onClick={handleSeedNews}
                style={{
                  backgroundColor: "#34c759",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                ✨ Inicializar BD con 3 Novedades de Prueba
              </button>
            )}

          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e0e5f2" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "16px 8px",
                    color: "#a3aed1",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {primaryField.label}
                </th>
                <th
                  style={{
                    textAlign: "right",
                    padding: "16px 8px",
                    color: "#a3aed1",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                // Handle localized primary field display
                const displayValue =
                  primaryField.localized && doc.translations
                    ? doc.translations[cmsConfig.defaultLanguage]?.[
                        primaryField.name
                      ]
                    : (doc[primaryField.name] as string);

                return (
                  <tr
                    key={doc.id}
                    style={{ borderBottom: "1px solid #f4f7fe" }}
                  >
                    <td
                      style={{
                        padding: "16px 8px",
                        color: "#2b3674",
                        fontWeight: 600,
                      }}
                    >
                      {displayValue || "Untitled"}
                    </td>
                    <td style={{ padding: "16px 8px", textAlign: "right" }}>
                      <Link
                        href={`/admin/collections/${schema.id}/${doc.id}`}
                        style={{
                          color: "#4318ff",
                          textDecoration: "none",
                          fontWeight: 600,
                          marginRight: "16px",
                          fontSize: "0.875rem",
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff3b30",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
