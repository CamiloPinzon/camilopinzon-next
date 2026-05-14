import styles from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  type?: "button" | "submit" | "reset";
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  download?: string | boolean;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  type = "button",
  className = "",
  ariaLabel,
  style,
  disabled,
  download,
  target,
  rel,
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        style={style}
        download={download === true ? undefined : download}
        target={target}
        rel={rel}
      >
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
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
