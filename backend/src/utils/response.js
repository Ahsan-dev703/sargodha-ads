// Utility functions for sending standardized API responses
const sendSuccess = (
  res,
  { statusCode = 200, message = "Success", data = null } = {},
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Utility function for sending standardized error responses
const sendError = (
  res,
  { statusCode = 500, message = "Internal server error", errors = null } = {},
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export { sendSuccess, sendError };
