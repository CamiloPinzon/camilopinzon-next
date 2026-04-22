import Image from "next/image";


interface Tech {
  name: string;
  icon: string;
  color: string;
  category: string;
}

interface TechCardProps {
  tech: Tech;
  index: number;
  styles: { readonly [key: string]: string };
}

function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export default function TechCard({ tech, index, styles }: TechCardProps) {
  return (
    <div
      className={styles.card}
      style={
        {
          "--accent": tech.color,
          animationDelay: `${index * 60}ms`,
        } as React.CSSProperties & { "--accent": string }
      }
    >
      <div className={styles.glow} />
      <span className={styles.icon} aria-hidden="true">
        {isUrl(tech.icon) ? (
          <Image src={tech.icon} alt={tech.name} width={48} height={48} />
        ) : (
          <span style={{ fontSize: "2rem" }}>{tech.icon}</span>
        )}
      </span>
      <span className={styles.name}>{tech.name}</span>
      <span className={styles.tag}>{tech.category}</span>
    </div>
  );
}
