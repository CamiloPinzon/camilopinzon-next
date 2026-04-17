export default function CodeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="7 8 2 12 7 16" />
      <polyline points="17 8 22 12 17 16" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}
