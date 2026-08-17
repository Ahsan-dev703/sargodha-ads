import { forwardRef } from "react";

import styles from "./Input.module.css";

const Input = forwardRef(function Input(
  { label, error, id, className = "", ...props },
  ref,
) {
  const inputClasses = [styles.input, error ? styles.inputError : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id || props.name} className={styles.label}>
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id || props.name}
        className={inputClasses}
        {...props}
      />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
