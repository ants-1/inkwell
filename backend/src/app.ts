import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import authRoutes from "./features/auth/authRoutes";
import userRoutes from "./features/users/userRoutes";
import noteRoutes from "./features/notes/noteRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http:localhost:5001",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session config
app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// Passport config
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", noteRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World - Authentication Server",
    authenticated: req.isAuthenticated ? req.isAuthenticated() : false,
  });
});

app.use(errorHandler);

export default app;
