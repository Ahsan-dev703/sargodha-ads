import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

import Alert from "@/components/ui/Alert/Alert";
import Spinner from "@/components/ui/Spinner/Spinner";
import Modal from "@/components/ui/Modal/Modal";
import { verifyEmail_fun } from "@/services/auth.service";

import styles from "./VerifyEmail.module.css";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

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
      <Modal open onClose={() => navigate("/")} title="Verify your email">
        <section className={styles.card}>
          <div className={styles.loadingIcon} aria-hidden="true">
            <Spinner label="Verifying email" />
          </div>

          <h1 className={styles.title}>Verifying your email</h1>

          <p className={styles.description}>
            Please wait while we verify your email address.
          </p>
        </section>
      </Modal>
    );
  }

  const isSuccess = status === "success";

  return (
    <Modal
      open
      onClose={() => navigate("/")}
      title={isSuccess ? "Email verified" : "Verification failed"}
    >
      <section className={styles.card}>
        <div
          className={`${styles.icon} ${
            isSuccess ? styles.successIcon : styles.errorIcon
          }`}
          aria-hidden="true"
        >
          {isSuccess ? <FiCheckCircle /> : <FiAlertCircle />}
        </div>

        <Alert variant={isSuccess ? "success" : "error"}>{message}</Alert>

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

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.backLink}
            onClick={() => navigate("/login")}
          >
            <FiArrowLeft aria-hidden="true" />
            Back to login
          </button>
        </div>
      </section>
    </Modal>
  );
}

export default VerifyEmail;
