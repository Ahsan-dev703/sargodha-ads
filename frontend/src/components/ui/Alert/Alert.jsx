import styles from "./Alert.module.css";

function Alert({ children, variant = "error", className = "" }) {
  const classNames = [styles.alert, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} role="alert">
      {children}
    </div>
  );
}

export default Alert;
