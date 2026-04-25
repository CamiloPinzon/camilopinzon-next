import { getRecentPosts } from "@/lib/firebase/queries";
import BlogCard from "@/components/blog-highlights/blog-card/blog-card";
import Link from "next/link";

export const revalidate = 3600;

export default async function BlogIndexPage() {
  // Fetch up to 50 posts for the main blog page
  const posts = await getRecentPosts('en', 50);

  // Format the dates as required by the BlogCard UI
  const formattedPosts = posts.map(p => ({
    ...p,
    date: new Date(p.publishedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }),
  }));

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <header style={{ marginBottom: '64px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#2b3674', marginBottom: '16px' }}>
          El Blog
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#a3aed1', maxWidth: '600px', margin: '0 auto' }}>
          Explora mis pensamientos, tutoriales y experiencias sobre desarrollo frontend, diseño UI/UX y crecimiento profesional.
        </p>
      </header>

      {formattedPosts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {formattedPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: '#f4f7fe', borderRadius: '24px' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📭</span>
          <p style={{ color: '#2b3674', fontSize: '1.25rem', fontWeight: 600 }}>No hay artículos publicados aún.</p>
        </div>
      )}
    </main>
  );
}
