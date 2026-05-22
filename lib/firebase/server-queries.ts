import "server-only";
import { adminDb } from "./admin";

export interface FAQItem {
  question: string;
  answer: string;
}

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
  faqs?: FAQItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: string[];
  website?: string;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  client?: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: string;
  coverImageAlt?: string;
  order: number;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  publishedAt: string;
  isPublished: boolean;
}

export async function getRecentPosts(
  lang: string = "en",
  maxLimit: number = 6,
): Promise<BlogPost[]> {
  try {
    const snapshot = await adminDb.collection("posts").get();

    let posts = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const localized =
        data.translations?.[lang] || data.translations?.["en"] || {};

      let pubDate = data.publishedAt || new Date().toISOString();
      if (pubDate && typeof pubDate.toDate === "function") {
        pubDate = pubDate.toDate().toISOString();
      }

      return {
        id: docSnap.id,
        slug: data.slug || docSnap.id,
        title: localized.title || "Untitled",
        excerpt: localized.excerpt || "",
        content: localized.content || "",
        coverImage: data.coverImage || "",
        publishedAt:
          typeof pubDate === "string"
            ? pubDate
            : new Date(pubDate).toISOString(),
        isPublished: !!data.isPublished,
        author: data.author || { name: "Camilo Pinzon" },
        tag: data.tag || "Desarrollo",
        color: data.color || "#61DAFB",
        readTime: data.readTime || "5 min",
        faqs: localized.faqs || data.faqs || [],
      };
    });

    posts = posts.filter((p) => p.isPublished);

    posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return posts.slice(0, maxLimit);
  } catch (error) {
    console.error("Error fetching recent posts via Admin SDK:", error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
  lang: string = "en",
): Promise<BlogPost | null> {
  try {
    const snapshot = await adminDb.collection("posts").get();
    const docSnap = snapshot.docs.find(
      (d) => (d.data().slug === slug || d.id === slug) && d.data().isPublished,
    );

    if (!docSnap) return null;

    const data = docSnap.data();
    const localized =
      data.translations?.[lang] || data.translations?.["en"] || {};

    let pubDate = data.publishedAt || new Date().toISOString();
    if (pubDate && typeof pubDate.toDate === "function") {
      pubDate = pubDate.toDate().toISOString();
    }

    return {
      id: docSnap.id,
      slug: data.slug || docSnap.id,
      title: localized.title || "Untitled",
      excerpt: localized.excerpt || "",
      content: localized.content || "",
      coverImage: data.coverImage || "",
      publishedAt:
        typeof pubDate === "string" ? pubDate : new Date(pubDate).toISOString(),
      isPublished: !!data.isPublished,
      author: data.author || { name: "Camilo Pinzon" },
      tag: data.tag || "Desarrollo",
      color: data.color || "#61DAFB",
      readTime: data.readTime || "5 min",
      faqs: localized.faqs || data.faqs || [],
    };
  } catch (error) {
    console.error("Error fetching post via Admin SDK:", error);
    return null;
  }
}

export async function getExperience(
  lang: string = "en",
): Promise<ExperienceItem[]> {
  try {
    const snapshot = await adminDb.collection("experience").get();

    const items = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const localized =
        data.translations?.[lang] || data.translations?.["en"] || {};

      let tags: string[] = [];
      if (Array.isArray(data.tags)) {
        tags = data.tags;
      } else if (typeof data.tags === "string") {
        tags = data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }

      return {
        id: docSnap.id,
        company: data.company || "Unknown",
        jobTitle: localized.jobTitle || data.jobTitle || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        description: localized.description || data.description || "",
        tags,
        website: data.website,
        order: data.order || 0,
      };
    });

    return items.sort((a, b) => b.order - a.order);
  } catch (error) {
    console.error("Error fetching experience via Admin SDK:", error);
    return [];
  }
}

export async function getProjects(lang: string = "en"): Promise<ProjectItem[]> {
  try {
    const snapshot = await adminDb.collection("projects").get();

    const items = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const localized =
        data.translations?.[lang] || data.translations?.["en"] || {};

      let tags: string[] = [];
      if (Array.isArray(data.techStack)) {
        tags = data.techStack;
      } else if (typeof data.techStack === "string") {
        tags = data.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }

      return {
        id: docSnap.id,
        title: localized.title || data.title || "Untitled Project",
        client: data.client || "",
        description: localized.description || data.description || "",
        tags,
        liveUrl: data.liveUrl || "",
        githubUrl: data.githubUrl || "",
        coverImage: data.coverImage || "",
        coverImageAlt: localized.coverImageAlt || data.coverImageAlt || "",
        order: typeof data.order === "number" ? data.order : 0,
      };
    });

    return items.sort((a, b) => b.order - a.order);
  } catch (error) {
    console.error("Error fetching projects via Admin SDK:", error);
    return [];
  }
}

export async function getRecentNews(
  lang: string = "en",
  maxLimit: number = 3,
): Promise<NewsItem[]> {
  try {
    const snapshot = await adminDb.collection("news").get();

    let news = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const localized =
        data.translations?.[lang] || data.translations?.["en"] || {};

      let pubDate = data.publishedAt || new Date().toISOString();
      if (pubDate && typeof pubDate.toDate === "function") {
        pubDate = pubDate.toDate().toISOString();
      }

      return {
        id: docSnap.id,
        title: localized.title || "Untitled",
        content: localized.content || "",
        image: data.image || "",
        publishedAt:
          typeof pubDate === "string"
            ? pubDate
            : new Date(pubDate).toISOString(),
        isPublished: data.isPublished === undefined ? true : !!data.isPublished,
      };
    });

    news = news.filter((item) => item.isPublished);

    news.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return news.slice(0, maxLimit);
  } catch (error) {
    console.error("Error fetching recent news via Admin SDK:", error);
    return [];
  }
}
