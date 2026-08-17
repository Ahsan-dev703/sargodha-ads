import { Link, useLocation } from "react-router-dom";

import styles from "./VerifyEmailPending.module.css";

function VerifyEmailPending() {
  const location = useLocation();

  const email = location.state?.email;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon} aria-hidden="true">
          ✉
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Check your email</h1>

          <p className={styles.description}>
            We've sent a verification link to your email address.
          </p>

          {email && <p className={styles.email}>{email}</p>}

          <p className={styles.helpText}>
            Open the email and click the verification link to activate your
            account. The link will expire in 15 minutes.
          </p>
        </div>

        <div className={styles.actions}>
          <Link to="/login" className={styles.loginButton}>
            Go to login
          </Link>
        </div>

        <p className={styles.footer}>
          Didn't receive the email? Check your spam or junk folder.
        </p>
      </section>
    </main>
  );
}

export default VerifyEmailPending;
