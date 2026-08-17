import styles from "./Spinner.module.css";

function Spinner({ size = "md", label = "Loading..." }) {
  return (
    <span className={styles.wrapper} role="status" aria-label={label}>
      <span className={`${styles.spinner} ${styles[size]}`} />
    </span>
  );
}

export default Spinner;
