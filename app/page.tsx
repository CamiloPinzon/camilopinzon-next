import MainHero from "@/components/main-hero/main-hero";
import TechStackJs from "@/components/tech-stack/tech-stack";
import BlogHighlights from "@/components/blog-highlights/blog-highlights";

export default function Home() {
  return (
    <main>
      <MainHero />
      <TechStackJs />
      <BlogHighlights />
    </main>
  );
}
