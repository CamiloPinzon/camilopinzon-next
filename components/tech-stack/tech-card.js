import Image from "next/image";

function isUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export default function TechCard({ tech, index }) {
  return (
    <div
      className="tech-card"
      style={{ "--accent": tech.color, animationDelay: `${index * 60}ms` }}
    >
      <div className="tech-card__glow" />
      <span className="tech-card__icon" aria-hidden="true">
        {isUrl(tech.icon) ? (
          <Image src={tech.icon} alt={tech.name} width={48} height={48} />
        ) : (
          <span style={{ fontSize: "2rem" }}>{tech.icon}</span>
        )}
      </span>
      <span className="tech-card__name">{tech.name}</span>
      <span className="tech-card__tag">{tech.category}</span>
    </div>
  );
}
