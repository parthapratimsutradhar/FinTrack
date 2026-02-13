import rateLimit from "express-rate-limit";

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: {
    success: false,
    message: "Too many requests, try again later",
  },
});

export default apiRateLimiter;
