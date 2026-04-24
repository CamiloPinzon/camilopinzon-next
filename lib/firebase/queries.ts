import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './config';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  isPublished: boolean;
  author?: { name: string; id?: string };
  tag?: string;
  color?: string;
  readTime?: string;
}

export async function getRecentPosts(lang: string = 'en', maxLimit: number = 6): Promise<BlogPost[]> {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    
    let posts = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      const localized = data.translations?.[lang] || data.translations?.['en'] || {};
      
      // Ensure dates are strictly serialized to strings for Next.js Server Components
      let pubDate = data.publishedAt || new Date().toISOString();
      if (pubDate && typeof pubDate.toDate === 'function') {
        pubDate = pubDate.toDate().toISOString();
      }

      // We map the database fields to our frontend BlogPost interface
      return {
        id: docSnap.id,
        slug: data.slug || docSnap.id,
        title: localized.title || 'Untitled',
        excerpt: localized.excerpt || '',
        content: localized.content || '',
        coverImage: data.coverImage || '',
        publishedAt: typeof pubDate === 'string' ? pubDate : new Date(pubDate).toISOString(),
        isPublished: !!data.isPublished,
        author: data.author || { name: 'Camilo Pinzon' },
        tag: data.tag || 'Desarrollo', // Default tag if missing
        color: data.color || '#61DAFB', // Default color if missing
        readTime: data.readTime || '5 min',
      };
    });

    // Filter out unpublished posts
    posts = posts.filter(p => p.isPublished);

    // Sort by date descending
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Limit to the max limit
    return posts.slice(0, maxLimit);

  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string, lang: string = 'en'): Promise<BlogPost | null> {
  try {
    // In our migration, we used the old document ID as the new document ID. 
    // And slug is currently often identical to the ID. 
    // For a highly robust system, we should query by 'slug', but querying all and finding it is safer if we don't have an index.
    const snapshot = await getDocs(collection(db, 'posts'));
    const docSnap = snapshot.docs.find(d => (d.data().slug === slug || d.id === slug) && d.data().isPublished);
    
    if (!docSnap) return null;

    const data = docSnap.data();
    const localized = data.translations?.[lang] || data.translations?.['en'] || {};
    
    let pubDate = data.publishedAt || new Date().toISOString();
    if (pubDate && typeof pubDate.toDate === 'function') {
      pubDate = pubDate.toDate().toISOString();
    }
    
    return {
      id: docSnap.id,
      slug: data.slug || docSnap.id,
      title: localized.title || 'Untitled',
      excerpt: localized.excerpt || '',
      content: localized.content || '',
      coverImage: data.coverImage || '',
      publishedAt: typeof pubDate === 'string' ? pubDate : new Date(pubDate).toISOString(),
      isPublished: !!data.isPublished,
      author: data.author || { name: 'Camilo Pinzon' },
      tag: data.tag || 'Desarrollo',
      color: data.color || '#61DAFB',
      readTime: data.readTime || '5 min',
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
