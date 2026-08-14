import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateRandomToken, hashToken } from "../utils/crypto.js";

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

  return {
    user,
    verificationToken,
  };
};

export { registerUser };