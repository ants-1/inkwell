import { Request, Response, NextFunction } from "express";
import { loginService, registerService } from "./authService";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const { user, token } = await loginService(username, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    const { user, token } = await registerService(username, email, password);

    res.status(201).json({
      success: true,
      message: "Sign up successful",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
