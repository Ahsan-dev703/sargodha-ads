import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiMail, FiSend } from "react-icons/fi";

import Alert from "@/components/ui/Alert/Alert";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Modal from "@/components/ui/Modal/Modal";

import { forgotPassword } from "@/services/auth.service";

import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await forgotPassword(formData.email);

      setSuccessMessage(
        response.message ||
          "If an account exists with this email, we have sent instructions to reset your password.",
      );
    } catch (error) {
      setServerError(
        error.message || "Unable to process your request. Please try again.",
      );
    }
  };

  return (
    <Modal
      open
      onClose={() => navigate("/", { replace: true })}
      title="Forgot your password?"
    >
      <section className={styles.card}>
        <div className={styles.icon} aria-hidden="true">
          <FiMail />
        </div>

        <div className={styles.header}>
          <p className={styles.description}>
            Enter the email address associated with your Sargodha Ads account
            and we'll send you a link to reset your password.
          </p>
        </div>

        {serverError && (
          <div className={styles.alertWrapper}>
            <Alert variant="error">{serverError}</Alert>
          </div>
        )}

        {successMessage && (
          <div className={styles.alertWrapper}>
            <Alert variant="success">{successMessage}</Alert>
          </div>
        )}

        {!successMessage && (
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email address is required.",

                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />

            <Button type="submit" size="lg" loading={isSubmitting} fullWidth>
              {!isSubmitting && <FiSend aria-hidden="true" />}
              Send reset link
            </Button>
          </form>
        )}

        <div className={styles.footer}>
          <Link to="/login" className={styles.backLink}>
            <FiArrowLeft aria-hidden="true" />
            Back to login
          </Link>
        </div>
      </section>
    </Modal>
  );
}

export default ForgotPassword;
