import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";

import Button from "@/components/ui/Button/Button";
import Alert from "@/components/ui/Alert/Alert";
import Input from "@/components/ui/Input/Input";
import Modal from "@/components/ui/Modal/Modal";

import { useAuth } from "@/hooks/useAuth";

import styles from "./Login.module.css";

function Login() {
  const { login, isAuthenticated } = useAuth();

  const [serverError, setServerError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setServerError("");

    try {
      await login({
        email: data.email,
        password: data.password,
      });

      const from = location.state?.from;

      const destination = from
        ? `${from.pathname}${from.search}${from.hash}`
        : "/dashboard";

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      setServerError(error.message || "Unable to sign in. Please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundContent} aria-hidden="true">
        <div className={styles.backgroundNav}>
          <span className={styles.backgroundLogo}>Sargodha Ads</span>
          <span className={styles.backgroundSearch}>Search in Sargodha</span>
          <span className={styles.backgroundAction}>Sell an item</span>
        </div>

        <div className={styles.backgroundMain}>
          <span className={styles.backgroundEyebrow}>Sargodha marketplace</span>
          <h1>Find something useful nearby.</h1>
          <p>Browse fresh listings from sellers across the city.</p>

          <div className={styles.backgroundGrid}>
            <div className={styles.backgroundCard} />
            <div className={styles.backgroundCard} />
            <div className={styles.backgroundCard} />
          </div>
        </div>
      </div>

      <Modal
        open
        onClose={() => navigate("/", { replace: true })}
        title="Welcome back"
      >
        <div className={styles.card}>
          <div className={styles.header}>
            <p className={styles.subtitle}>
              Login to your Sargodha Ads account.
            </p>
          </div>

          {serverError && (
            <div className={styles.alertWrapper}>
              <Alert variant="error">{serverError}</Alert>
            </div>
          )}

          <div className={styles.socialSection}>
            <div className={styles.socialButtons}>
              <button type="button" className={styles.socialButton}>
                <SiGoogle aria-hidden="true" />
                <span>Google</span>
              </button>
              <button type="button" className={styles.socialButton}>
                <SiFacebook aria-hidden="true" />
                <span>Facebook</span>
              </button>
              <button type="button" className={styles.socialButton}>
                <SiApple aria-hidden="true" />
                <span>Apple</span>
              </button>
            </div>

            <div className={styles.divider}>
              <span>or continue with email</span>
            </div>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />

            <div className={styles.passwordFieldWrap}>
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isSubmitting}
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
              />

              <div className={styles.forgotPasswordWrap}>
                <Link
                  to="/forgot-password"
                  className={styles.forgotPasswordLink}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" size="lg" loading={isSubmitting}>
              Sign in
            </Button>
          </form>

          <div className={styles.footer}>
            <span>Don't have an account?</span>

            <Link to="/register" className={styles.registerLink}>
              Create account
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
