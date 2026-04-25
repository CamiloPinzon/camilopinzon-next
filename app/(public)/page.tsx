import MainHero from "@/components/main-hero/main-hero";
import TechStack from "@/components/tech-stack/tech-stack";
import BlogHighlights from "@/components/blog-highlights/blog-highlights";
import Brands from "@/components/brands/brands";
import { getRecentPosts } from "@/lib/firebase/queries";

export const revalidate = 3600;

export default async function Home() {
  const posts = await getRecentPosts('en', 7);

  return (
    <main>
      <MainHero />
      <TechStack />
      <BlogHighlights posts={posts} />
      <Brands />
    </main>
  );
}
