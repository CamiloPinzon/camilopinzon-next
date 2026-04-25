import { getExperience } from "@/lib/firebase/queries";
import Experience from "@/components/experience/experience";

export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await getExperience('en');

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <Experience 
        items={experiences} 
        title="Experiencia" 
        subtitle="Un vistazo detallado a mi trayectoria profesional, los retos que he superado y las empresas con las que he colaborado."
      />
    </div>
  );
}
