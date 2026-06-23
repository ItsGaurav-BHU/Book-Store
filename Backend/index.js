import dotenv from "dotenv";
// Load environment variables immediately at startup
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import rateLimit from "express-rate-limit";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import { errorHandler, AppError } from "./middleware/errorHandler.js";

const app = express();

// 1. Dynamic CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000", "http://localhost:4001"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS policy blocked access from this origin."), false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// 2. Rate Limiter Middleware to prevent brute force/abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter specifically to user route (authentication paths)
app.use("/user", apiLimiter);

// 3. Mongoose Connection with Event Observers
const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

if (!URI) {
  console.error("FATAL CONFIG ERROR: MongoDBURI is missing in your .env file!");
  process.exit(1);
}

mongoose
  .connect(URI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection failed on initial startup:", err.message);
  });

// Handle connection failures after startup
mongoose.connection.on("error", (err) => {
  console.error("Database connection lost:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose connection disconnected. Retrying...");
});

// 4. Routes registration
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MERN Book Store Backend API is active",
  });
});

// Catch-all route handler for unknown endpoints
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 5. Global Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in [${process.env.NODE_ENV || "development"}] mode on port ${PORT}`);
});
