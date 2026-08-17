import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { resendVerificationEmail } from "@/services/auth.service";
import Button from "@/components/ui/Button/Button";
import Alert from "@/components/ui/Alert/Alert";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import styles from "./VerifyEmailPending.module.css";

function VerifyEmailPending() {
  const location = useLocation();

  const email = location.state?.email;

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    if (!email) {
      setError(
        "We don't know which email address to send the verification email to.",
      );
      return;
    }

    setMessage("");
    setError("");
    setIsSending(true);

    try {
      const response = await resendVerificationEmail(email);

      setMessage(
        response.message ||
          "If your account is unverified, a new verification email has been sent.",
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to resend the verification email. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden="true">
          <FiMail />
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Check your email</h1>

          <p className={styles.description}>
            We've sent a verification link to your email address.
          </p>

          {email && <p className={styles.email}>{email}</p>}

          <p className={styles.helpText}>
            Please open the email and click the verification link to activate
            your account.
          </p>
        </div>

        {message && (
          <div className={styles.alertWrapper}>
            <Alert variant="success">{message}</Alert>
          </div>
        )}

        {error && (
          <div className={styles.alertWrapper}>
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={handleResend}
            disabled={isSending || !email}
            loading={isSending}
            fullWidth
          >
            {!isSending && <FiRefreshCw aria-hidden="true" />}
            Resend verification email
          </Button>

          <Button as={Link} to="/login" size="lg" fullWidth>
            Go to login
          </Button>
        </div>

        <p className={styles.footer}>
          Didn't receive the email? Check your spam or junk folder.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmailPending;
