import TechCard from "./tech-card";

import "./tech-stack.css";

const STACK = [
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
    color: "#000000",
    category: "framework",
  },
];

export default function TechStackJs() {
  return (
    <section className="stack-section" aria-labelledby="stack-title">
      <div className="section-wrapper">
        <header className="section-header">
          <span className="section-label">Herramientas &amp; Tecnologías</span>
          <h2 className="section-title" id="stack-title">
            Stack <em>Tecnológico</em>
          </h2>
        </header>
        <div
          className="stack-bento"
          role="list"
          aria-label="Tecnologías que domino"
        >
          {STACK.map((tech, i) => (
            <div key={tech.name} role="listitem">
              <TechCard tech={tech} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
