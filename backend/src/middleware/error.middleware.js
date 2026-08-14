import config from "../config/config.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal server error";

  const errors = err.errors || null;

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(config.env === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;
