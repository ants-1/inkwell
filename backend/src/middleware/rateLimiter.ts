import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Request limit
  message: "Too many requests from this IP, please try again after 15 minutes",
});
