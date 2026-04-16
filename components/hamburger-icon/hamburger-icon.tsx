export default function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y={open ? "10" : "4"}
        width="18"
        height="2"
        rx="1"
        fill="currentColor"
        style={{
          transform: open ? "rotate(45deg)" : "none",
          transformOrigin: "center",
          transition: "all 0.25s",
        }}
      />
      <rect
        x="2"
        y="10"
        width="18"
        height="2"
        rx="1"
        fill="currentColor"
        style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s" }}
      />
      <rect
        x="2"
        y={open ? "10" : "16"}
        width="18"
        height="2"
        rx="1"
        fill="currentColor"
        style={{
          transform: open ? "rotate(-45deg)" : "none",
          transformOrigin: "center",
          transition: "all 0.25s",
        }}
      />
    </svg>
  );
}
