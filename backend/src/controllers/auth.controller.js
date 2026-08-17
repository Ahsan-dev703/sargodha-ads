import {
  registerUser,
  verifyEmail,
  resendVerificationEmail as resendVerificationEmailService,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  loginUser,
} from "../services/auth.service.js";
import { isValidEmail, isValidPassword } from "../utils/validation.js";
import { sendSuccess } from "../utils/response.js";
import cookieParser from "cookie-parser";
import config from "../config/config.js";
import {
  rotateRefreshToken,
  revokeRefreshToken,
} from "../services/refreshToken.service.js";

// Register Controller
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Name, email and password are required");
      error.statusCode = 400;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error("Invalid email address");
      error.statusCode = 400;
      throw error;
    }

    if (!isValidPassword(password)) {
      const error = new Error("Password must be at least 8 characters");
      error.statusCode = 400;
      throw error;
    }

    const result = await registerUser({
      name,
      email,
      password,
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: "Registration successful. Please verify your email.",
      data: {
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          emailVerified: result.user.emailVerified,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Verify Email Controller
const verifyEmailController = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      const error = new Error("Verification token is required");
      error.statusCode = 400;
      throw error;
    }

    // Call the verifyEmail function from auth.service.js
    await verifyEmail(token);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email address is required");
      error.statusCode = 400;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error("Invalid email address");
      error.statusCode = 400;
      throw error;
    }

    await resendVerificationEmailService(email);

    return sendSuccess(res, {
      statusCode: 200,
      message:
        "If an unverified account exists with this email, a new verification email has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

// Login Controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({
      email,
      password,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email address is required");
      error.statusCode = 400;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error("Invalid email address");
      error.statusCode = 400;
      throw error;
    }

    await forgotPasswordService(email);

    return sendSuccess(res, {
      statusCode: 200,
      message:
        "If an account exists with this email, we have sent instructions to reset your password.",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      const error = new Error("Password reset token is required");
      error.statusCode = 400;
      throw error;
    }

    if (!password) {
      const error = new Error("New password is required");
      error.statusCode = 400;
      throw error;
    }

    if (!isValidPassword(password)) {
      const error = new Error("Password must be at least 8 characters");
      error.statusCode = 400;
      throw error;
    }

    await resetPasswordService({
      token,
      password,
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new Error("Refresh token is required");
      error.statusCode = 401;
      throw error;
    }

    const result = await rotateRefreshToken(refreshToken);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Access token refreshed",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "strict",
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  verifyEmailController,
  resendVerificationEmail,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
};
