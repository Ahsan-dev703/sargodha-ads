import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button/Button";
import Alert from "@/components/ui/Alert/Alert";
import Input from "@/components/ui/Input/Input";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Login.module.css";
import { useState } from "react";

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
    try {
      await login({
        email: data.email,
        password: data.password,
      });

      const from = location.state?.from?.pathname || "/dashboard";

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      setServerError(error.message || "Unable to sign in. Please try again.");
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back</h1>

          <p className={styles.subtitle}>Login to your Sargodha Ads account.</p>
        </div>
        
        {serverError && (
          <div className={styles.alertWrapper}>
            <Alert>{serverError}</Alert>
          </div>
        )}

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
    </section>
  );
}

export default Login;
