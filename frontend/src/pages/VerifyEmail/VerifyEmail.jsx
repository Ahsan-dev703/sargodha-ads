import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail_fun } from "@/services/auth.service";
import styles from "./VerifyEmail.module.css";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const handleEmailVerification = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await verifyEmail_fun(token);
        if (cancelled) {
          return;
        }
        setMessage(
          response.message || "Your email has been verified successfully.",
        );
        setStatus("success");
      } catch (error) {
        if (cancelled) {
          return;
        }
        setMessage(error.message || "We could not verify your email.");
        setStatus("error");
      }
    };

    handleEmailVerification();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "loading") {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.spinner} aria-hidden="true" />

          <h1 className={styles.title}>Verifying your email</h1>

          <p className={styles.description}>
            Please wait while we verify your email address.
          </p>
        </section>
      </main>
    );
  }

  const isSuccess = status === "success";

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div
          className={`${styles.icon} ${
            isSuccess ? styles.successIcon : styles.errorIcon
          }`}
          aria-hidden="true"
        >
          {isSuccess ? "✓" : "!"}
        </div>

        <h1 className={styles.title}>
          {isSuccess ? "Email verified" : "Verification failed"}
        </h1>

        <p className={styles.description}>{message}</p>

        {isSuccess && (
          <p className={styles.helpText}>
            Your account is now verified. You can sign in and continue to
            Sargodha Ads.
          </p>
        )}

        {!isSuccess && (
          <p className={styles.helpText}>
            The verification link may have expired or already been used. Please
            request a new verification email.
          </p>
        )}

        <div className={styles.actions}>
          <Link to="/login" className={styles.loginButton}>
            Go to login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default VerifyEmail;
