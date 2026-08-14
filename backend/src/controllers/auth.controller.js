import {
  registerUser,
  verifyEmail,
  loginUser,
} from "../services/auth.service.js";
import { isValidEmail, isValidPassword } from "../utils/validation.js";
import { sendSuccess } from "../utils/response.js";
import cookieParser from "cookie-parser";
import config from "../config/config.js";

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

export { register, verifyEmailController, login };
