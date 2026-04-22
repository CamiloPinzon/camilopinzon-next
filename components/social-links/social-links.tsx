import CodeIcon from "@/assets/icons/code-icon";
import GitHubIcon from "@/assets/icons/github-icon";
import InstagramIcon from "@/assets/icons/instagram-icon";
import LinkedInIcon from "@/assets/icons/linkedin-icon";
import XIcon from "@/assets/icons/x-icon";

import "./social-links.css";

const SOCIALS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/camilo-pinzon",
    icon: <LinkedInIcon />,
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/CamiloPinzon",
    icon: <GitHubIcon />,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    href: "#proyectos",
    icon: <CodeIcon />,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/camilopinzon_developer",
    icon: <InstagramIcon />,
  },
  {
    key: "x",
    label: "X (Twitter)",
    href: "https://x.com/CamiloPinzonDev",
    icon: <XIcon />,
  },
] as const;

export default function SocialLinks() {
  return (
    <div className="social-links" aria-label="Redes sociales">
      {SOCIALS.map(({ key, label, href, icon }) => (
        <a
          key={key}
          href={href}
          className="social-links__btn"
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
