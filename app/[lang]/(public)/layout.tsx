import MainNav from "@/components/nav/main-nav";
import Footer from "@/components/footer/footer";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <MainNav />
      {children}
      <Footer lang={lang} />
    </>
  );
}
