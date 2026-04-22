import styles from "./input.module.scss";

interface InputProps {
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
  name?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  ariaLabel?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  type = "text",
  name,
  id,
  value,
  defaultValue,
  placeholder,
  ariaLabel,
  required,
  disabled,
  autoComplete,
  onChange,
  className = "",
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      aria-label={ariaLabel}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      onChange={onChange}
      className={[styles.input, className].filter(Boolean).join(" ")}
    />
  );
}
