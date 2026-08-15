import RefreshToken from "../models/RefreshToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { hashToken } from "../utils/crypto.js";
import User from "../models/User.js";

const saveRefreshToken = async ({ userId, refreshToken }) => {
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await RefreshToken.create({
    user: userId,
    tokenHash,
    expiresAt,
  });

  return session;
};

const rotateRefreshToken = async (currentRefreshToken) => {
  let decoded;

  try {
    decoded = verifyRefreshToken(currentRefreshToken);
  } catch {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }

  if (decoded.type !== "refresh") {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }

  const currentTokenHash = hashToken(currentRefreshToken);

  const storedToken = await RefreshToken.findOne({
    tokenHash: currentTokenHash,
  });

  if (!storedToken) {
    const error = new Error("Refresh token not recognized");
    error.statusCode = 401;
    throw error;
  }

  if (storedToken.revokedAt) {
    await RefreshToken.updateMany(
      {
        user: storedToken.user,
        revokedAt: null,
      },
      {
        $set: {
          revokedAt: new Date(),
        },
      },
    );

    const error = new Error(
      "Refresh token reuse detected. All sessions have been revoked.",
    );
    error.statusCode = 401;
    throw error;
  }

  if (storedToken.expiresAt <= new Date()) {
    const error = new Error("Refresh token has expired");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.sub);

  if (!user) {
    const error = new Error("User no longer exists");
    error.statusCode = 401;
    throw error;
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  const newTokenHash = hashToken(newRefreshToken);
  const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await RefreshToken.create({
    user: user._id,
    tokenHash: newTokenHash,
    expiresAt: newExpiresAt,
  });

  storedToken.revokedAt = new Date();
  storedToken.replacedByTokenHash = newTokenHash;

  await storedToken.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const revokeRefreshToken = async (refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({
    tokenHash,
  });

  if (!storedToken) {
    return;
  }

  if (!storedToken.revokedAt) {
    storedToken.revokedAt = new Date();

    await storedToken.save();
  }
};

export { saveRefreshToken, rotateRefreshToken, revokeRefreshToken };
