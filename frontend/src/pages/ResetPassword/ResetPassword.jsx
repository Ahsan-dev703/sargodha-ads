import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiCheckCircle, FiLock, FiSave } from "react-icons/fi";

import Alert from "@/components/ui/Alert/Alert";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";

import { resetPassword } from "@/services/auth.service";

import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMessage("");

    if (!token) {
      setServerError("Password reset token is missing.");
      return;
    }

    try {
      const response = await resetPassword({
        token,
        password: formData.password,
      });

      setSuccessMessage(
        response.message || "Password reset successfully. You can now log in.",
      );
    } catch (error) {
      setServerError(
        error.message || "Unable to reset your password. Please try again.",
      );
    }
  };

  if (successMessage) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div
            className={`${styles.icon} ${styles.successIcon}`}
            aria-hidden="true"
          >
            <FiCheckCircle />
          </div>

          <h1 className={styles.title}>Password reset successful</h1>

          <p className={styles.description}>{successMessage}</p>

          <p className={styles.helpText}>
            Your password has been changed successfully. You can now sign in
            using your new password.
          </p>

          <div className={styles.actions}>
            <Button as={Link} to="/login" size="lg" fullWidth>
              Go to login
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon} aria-hidden="true">
          <FiLock />
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Reset your password</h1>

          <p className={styles.description}>
            Create a new password for your Sargodha Ads account.
          </p>
        </div>

        {serverError && (
          <div className={styles.alertWrapper}>
            <Alert variant="error">{serverError}</Alert>
          </div>
        )}

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            label="New password"
            type="password"
            placeholder="Enter your new password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password", {
              required: "New password is required.",

              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />

          <Input
            label="Confirm password"
            type="password"
            placeholder="Confirm your new password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password.",

              validate: (value) =>
                value === password || "Passwords do not match.",
            })}
          />

          <Button type="submit" size="lg" loading={isSubmitting} fullWidth>
            {!isSubmitting && <FiSave aria-hidden="true" />}
            Reset password
          </Button>
        </form>

        <div className={styles.footer}>
          <Link to="/login" className={styles.backLink}>
            <FiArrowLeft aria-hidden="true" />
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ResetPassword;
