import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateRandomToken, hashToken } from "../utils/crypto.js";
import { sendVerificationEmail } from "./email.service.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import RefreshToken from "../models/RefreshToken.js";
import { saveRefreshToken } from "./refreshToken.service.js";

const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const verificationToken = generateRandomToken();
  const verificationTokenHash = hashToken(verificationToken);
  // Set the token expiration time to 15 minutes from now
  const verificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    emailVerified: false,
    emailVerificationTokenHash: verificationTokenHash,
    emailVerificationTokenExpiresAt: verificationTokenExpiresAt,
  });

  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    verificationToken,
  });

  return {
    user,
  };
};

const verifyEmail = async (token) => {
  const tokenHash = hashToken(token);

  const user = await User.findOne({
    emailVerificationTokenHash: tokenHash,
    emailVerificationTokenExpiresAt: {
      $gt: new Date(),
    },
  });

  if (!user) {
    const error = new Error("Invalid or expired verification token");
    error.statusCode = 400;
    throw error;
  }

  user.emailVerified = true;
  user.emailVerificationTokenHash = null;
  user.emailVerificationTokenExpiresAt = null;

  await user.save();

  return user;
};

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!user.emailVerified) {
    const error = new Error("Please verify your email before logging in");
    error.statusCode = 403;
    throw error;
  }

  // Generate access and refresh tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  // Save the refresh token in the database
  await saveRefreshToken({ userId: user._id, refreshToken });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    },

    accessToken,
    refreshToken,
  };
};

export { registerUser, verifyEmail, loginUser };
