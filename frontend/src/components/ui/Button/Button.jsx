import styles from "./Button.module.css";

function Button({
  children,
  as: Component = "button",
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = disabled || loading;

  const componentProps = {
    className: classNames,
    ...props,
  };

  // Native button-specific props
  if (Component === "button") {
    componentProps.type = type;
    componentProps.disabled = isDisabled;
  }

  return (
    <Component {...componentProps}>
      {loading ? (
        <span className={styles.loadingContent}>
          <span className={styles.spinner} />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </Component>
  );
}

export default Button;
