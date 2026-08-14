import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      type: "access",
    },
    config.jwt.accessSecret,
    {
      expiresIn: "15m",
    },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      type: "refresh",
    },
    config.jwt.refreshSecret,
    {
      expiresIn: "7d",
    },
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwt.accessSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
