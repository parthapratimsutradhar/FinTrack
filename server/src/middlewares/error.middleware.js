import ApiError from "../utils/ApiError.js";
import { errorResponse } from "../utils/responseHandler.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Convert unknown errors to ApiError
  if (!(error instanceof ApiError)) {
    let statusCode = 500;
    let message = error.message || "Internal Server Error";

    // 🧠 Mongoose: invalid ObjectId
    if (error.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID format";
    }

    // 🧠 Mongoose: duplicate key
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue)[0];
      message = `${field} already exists`;
    }

    // 🧠 JWT errors
    if (error.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Invalid token";
    }

    if (error.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Token expired";
    }

    error = new ApiError(statusCode, message);
  }

  if (process.env.NODE_ENV !== "production") {
    console.error("🔥 Error:", err);
  }

  return errorResponse(res, {
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
  });
};

export default errorMiddleware;
