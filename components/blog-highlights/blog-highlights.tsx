"use client";

import "./blog-highlights.css";
import { useState } from "react";

import BlogCard from "./blog-card/blog-card";
import BlogFilterPills from "./blog-filter-pills/blog-filter-pills";
import BlogNewsletter from "./blog-newsletter/blog-newsletter";
import Button from "@/components/ui/button/button";

const BLOG_POSTS = [
  {
    id: 1,
    tag: "Ecosistema Open-Source",
    title:
      "Por qué el traslado de React a la Linux Foundation es importante para los desarrolladores front-end",
    date: "11/4/2025",
    excerpt:
      "React, la librería que impulsa millones de interfaces modernas, entra en una nueva era. Meta transfirió React a la Linux Foundation, creando la React Foundation, un movimiento que podría redefinir cómo evoluciona la librería más popular del front-end.",
    color: "#61DAFB",
    readTime: "5 min",
    featured: true,
  },
  {
    id: 2,
    tag: "Filosofía Dev",
    title: "KISS: El principio que todo dev debería tatuarse (mentalmente)",
    date: "4/9/2025",
    excerpt:
      "KISS no es sólo una banda de rock. Es una filosofía de desarrollo que te ayuda a mantener tu código limpio, fácil de entender y libre de complicaciones innecesarias.",
    color: "#A78BFA",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 3,
    tag: "IA & Futuro",
    title: "Vibe Coding y el Futuro de los Desarrolladores",
    date: "4/1/2025",
    excerpt:
      "Esta reflexión sobre el vibe coding explora cómo la inteligencia artificial está transformando el rol del desarrollador, los riesgos de depender demasiado de ella.",
    color: "#F472B6",
    readTime: "7 min",
    featured: false,
  },
  {
    id: 4,
    tag: "Performance Web",
    title: "Core Web Vitals en 2025: Lo que realmente importa para tu score",
    date: "3/18/2025",
    excerpt:
      "Google sigue actualizando sus métricas de rendimiento. Aprende cuáles son las nuevas señales que impactan tu posicionamiento y cómo optimizarlas sin sacrificar la experiencia de usuario.",
    color: "#34D399",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 5,
    tag: "CSS Moderno",
    title: "@layer, @scope y container queries: el CSS que nadie te enseñó",
    date: "2/28/2025",
    excerpt:
      "Las nuevas características de CSS están cambiando la forma en que estructuramos los estilos. Descubre cómo estas herramientas nativas pueden reemplazar librerías enteras.",
    color: "#FB923C",
    readTime: "8 min",
    featured: false,
  },
  {
    id: 6,
    tag: "Carrera Dev",
    title: "De freelancer a agencia: lecciones del camino",
    date: "2/10/2025",
    excerpt:
      "Escalar de proyectos individuales a manejar múltiples clientes simultáneamente requiere más que habilidades técnicas. Aquí comparto las lecciones más difíciles del proceso.",
    color: "#FBBF24",
    readTime: "9 min",
    featured: false,
  },
];

const ALL_TAGS = [
  "Todos",
  ...Array.from(new Set(BLOG_POSTS.map((p) => p.tag))),
];

export default function BlogHighlights() {
  const [activeTag, setActiveTag] = useState("Todos");

  const filteredPosts =
    activeTag === "Todos"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.tag === activeTag);
  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const gridPosts = filteredPosts.filter(
    (p) => !(p.featured && activeTag === "Todos"),
  );

  return (
    <section
      id="blogs"
      className="blog-section"
      aria-labelledby="blog-title"
    >
      <div className="section-wrapper">
        <div className="blog-header-row">
          <header style={{ marginBottom: 0 }}>
            <span className="section-label">Contenido &amp; Aprendizaje</span>
            <h2 className="section-title" id="blog-title">
              Últimas publicaciones <em>del blog</em>
            </h2>
          </header>

          <BlogFilterPills
            tags={ALL_TAGS}
            activeTag={activeTag}
            onTagChange={setActiveTag}
          />
        </div>

        {/* Featured — visible only when "Todos" */}
        {activeTag === "Todos" && featuredPost && (
          <div className="blog-featured-wrapper">
            <BlogCard post={featuredPost} index={0} variant="featured" />
          </div>
        )}

        {/* Grid */}
        {gridPosts.length > 0 ? (
          <div className="blog-grid">
            {gridPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="blog-empty" aria-live="polite">
            <span className="blog-empty-icon" aria-hidden="true">
              📭
            </span>
            <p className="blog-empty-text">
              No hay artículos en esta categoría aún
            </p>
          </div>
        )}

        <div className="blog-cta-row">
          <Button href="/blog" variant="ghost">
            Ver todos
          </Button>
        </div>

        {/* Newsletter CTA */}
        <BlogNewsletter />
      </div>
    </section>
  );
}
