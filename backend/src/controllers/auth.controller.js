import { registerUser, verifyEmail } from "../services/auth.service.js";
import { isValidEmail, isValidPassword } from "../utils/validation.js";
import { sendSuccess } from "../utils/response.js";

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

export { register, verifyEmailController };
