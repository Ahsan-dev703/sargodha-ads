import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from "@/components/ui/Alert/Alert";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Modal from "@/components/ui/Modal/Modal";
import { registerUser } from "@/services/auth.service";
import styles from "./Register.module.css";

function Register() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/verify-email-pending", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      setServerError(
        error.message || "Unable to create your account. Please try again.",
      );
    }
  };

  return (
    <Modal
      open
      onClose={() => navigate("/", { replace: true })}
      title="Create your account"
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.subtitle}>
            Join Sargodha Ads and start buying and selling locally.
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

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            label="Name"
            type="text"
            placeholder="Muhammad"
            autoComplete="name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required.",

              minLength: {
                value: 2,
                message: "Name must be at least 2 characters.",
              },

              maxLength: {
                value: 50,
                message: "Name must not exceed 50 characters.",
              },
            })}
          />

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

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required.",

              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />

          <Button type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className={styles.footer}>
          <span>Already have an account?</span>

          <Link to="/login" className={styles.loginLink}>
            Sign in
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default Register;
