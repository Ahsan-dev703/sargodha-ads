import { verifyAccessToken } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      const error = new Error("Access token is required");
      error.statusCode = 401;
      throw error;
    }

    const [scheme, token, ...extra] = authorization.trim().split(/\s+/);

    if (scheme !== "Bearer" || !token || extra.length > 0) {
      const error = new Error("Invalid authorization header");
      error.statusCode = 401;
      throw error;
    }

    const decoded = verifyAccessToken(token);

    if (decoded.type !== "access") {
      const error = new Error("Invalid access token");
      error.statusCode = 401;
      throw error;
    }

    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    next(error);
  }
};

export default authenticate;
