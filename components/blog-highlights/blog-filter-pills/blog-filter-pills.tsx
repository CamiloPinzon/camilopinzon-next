import "./blog-filter-pills.css";

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
      <ul className="blog-filter-pills">
        {tags.map((tag) => (
          <li key={tag}>
            <button
              className={`blog-filter-pill${activeTag === tag ? " blog-filter-pill--active" : ""}`}
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
