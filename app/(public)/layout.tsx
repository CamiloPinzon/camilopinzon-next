import MainNav from "@/components/nav/main-nav";
import Footer from "@/components/footer/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNav />
      {children}
      <Footer />
    </>
  );
}
