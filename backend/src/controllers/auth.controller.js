import { registerUser } from "../services/auth.service.js";
import { isValidEmail, isValidPassword } from "../utils/validation.js";
import { sendSuccess } from "../utils/response.js";

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

export { register };
