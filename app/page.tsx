import MainHero from "@/components/main-hero/main-hero";
import TechStackJs from "@/components/tech-stack/tech-stack";
import BlogHighlights from "@/components/blog-highlights/blog-highlights";
import Brands from "@/components/brands/brands";

export default function Home() {
  return (
    <main>
      <MainHero />
      <TechStackJs />
      <BlogHighlights />
      <Brands />
    </main>
  );
}
