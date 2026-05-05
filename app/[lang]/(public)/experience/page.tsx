import { getExperience } from "@/lib/firebase/queries";
import Experience from "@/components/experience/experience";
import { Metadata } from "next";
import { getTranslations } from "@/lib/i18n/translations";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title:
      lang === "es" ? "Experiencia Profesional" : "Professional Experience",
    description:
      lang === "es"
        ? "Trayectoria profesional de Camilo Pinzón: empresas, roles y tecnologías a lo largo de su carrera."
        : "Professional journey of Camilo Pinzón: companies, roles and technologies throughout his career.",
    alternates: {
      canonical: `https://camilopinzon.netlify.app/${lang}/experience`,
      languages: {
        en: "https://camilopinzon.netlify.app/en/experience",
        es: "https://camilopinzon.netlify.app/es/experience",
      },
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const experiences = await getExperience(lang);
  const t = getTranslations(lang);

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <Experience
        items={experiences}
        title={t.experience.pageTitle}
        subtitle={t.experience.pageSubtitle}
      />
    </div>
  );
}
