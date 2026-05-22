"use client";

import { useRef } from "react";
import { getTranslations } from "@/lib/i18n/translations";
import TechCard from "./tech-card";
import styles from "./tech-stack.module.scss";
import { useReveal } from "@/lib/hooks/use-reveal";

interface Tech {
  name: string;
  icon: string;
  color: string;
  category: string;
}

const STACK: Tech[] = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    color: "#E34F26",
    category: "markup",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    color: "#1572B6",
    category: "style",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    category: "lang",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB",
    category: "lib",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    category: "lang",
  },
  {
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg",
    color: "#21759B",
    category: "cms",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "#F05032",
    category: "tool",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    color: "#ffffff",
    category: "tool",
  },
  {
    name: "SASS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
    color: "#CC6699",
    category: "style",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
    category: "backend",
  },
  {
    name: "Netlify",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-plain.svg",
    color: "#00C7B7",
    category: "deploy",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
    category: "framework",
  },
];

export default function TechStack({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  return (
    <section className={styles.section} aria-labelledby="stack-title" ref={sectionRef}>
      <div className="section-wrapper">
        <header className="section-header" data-reveal>
          <span className="section-label">{t.techStack.sectionLabel}</span>
          <h2 className="section-title" id="stack-title">
            Stack <em>{t.techStack.sectionTitleEm}</em>
          </h2>
        </header>
        <div
          className={styles.bento}
          role="list"
          aria-label={t.techStack.ariaLabel}
        >
          {STACK.map((tech, i) => (
            <div
              key={tech.name}
              role="listitem"
              className={styles.cardWrapper}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
            >
              <TechCard tech={tech} index={i} styles={styles} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
