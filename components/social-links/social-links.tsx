import { type ComponentType } from "react";

import CodeIcon from "@/assets/icons/code-icon";
import GitHubIcon from "@/assets/icons/github-icon";
import InstagramIcon from "@/assets/icons/instagram-icon";
import LinkedInIcon from "@/assets/icons/linkedin-icon";
import XIcon from "@/assets/icons/x-icon";

import styles from "./social-links.module.scss";

type IconComponent = ComponentType;

const SOCIALS: {
  key: string;
  label: string;
  href: string;
  Icon: IconComponent;
}[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/camilo-pinzon",
    Icon: LinkedInIcon,
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/CamiloPinzon",
    Icon: GitHubIcon,
  },
  { key: "portfolio", label: "Portfolio", href: "#proyectos", Icon: CodeIcon },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/camilopinzon_developer",
    Icon: InstagramIcon,
  },
  {
    key: "x",
    label: "X (Twitter)",
    href: "https://x.com/CamiloPinzonDev",
    Icon: XIcon,
  },
];

export default function SocialLinks() {
  return (
    <div className={styles.socialLinks} aria-label="Redes sociales">
      {SOCIALS.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          className={styles.btn}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
