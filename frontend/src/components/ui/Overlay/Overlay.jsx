import styles from "./Overlay.module.css";

function Overlay({ open = false, onClick, children, className = "" }) {
  if (!open) {
    return null;
  }

  const classNames = [styles.overlay, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} onClick={onClick} aria-hidden="true">
      {children}
    </div>
  );
}

export default Overlay;
