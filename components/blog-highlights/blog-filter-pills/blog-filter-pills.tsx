import styles from "./blog-filter-pills.module.scss";

interface BlogFilterPillsProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export default function BlogFilterPills({
  tags,
  activeTag,
  onTagChange,
}: BlogFilterPillsProps) {
  return (
    <nav aria-label="Filtrar por categoría">
      <ul className={styles.pills}>
        {tags.map((tag) => (
          <li key={tag}>
            <button
              className={`${styles.pill}${activeTag === tag ? ` ${styles.pillActive}` : ""}`}
              onClick={() => onTagChange(tag)}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
