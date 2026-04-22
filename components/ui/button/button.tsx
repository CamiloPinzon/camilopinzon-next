import styles from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  type?: "button" | "submit" | "reset";
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  type = "button",
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
