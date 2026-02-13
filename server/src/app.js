import express from "express";
import authRoutes from "./routes/auth.routes.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import apiRateLimiter from "./middlewares/rateLimit.middleware.js";

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter (all routes)
app.use(apiRateLimiter);

// Routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorMiddleware);

export default app;
