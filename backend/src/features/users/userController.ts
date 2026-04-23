import { Request, Response, NextFunction } from "express";
import {
  getUserService,
  updateUserService,
  updateUserPasswordService,
} from "./userService";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    const { user } = await getUserService(id);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const { username, email } = req.body;

    const { user } = await updateUserService(id, username, email);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const { currentPassword, newPassword } = req.body;

    const { message } = await updateUserPasswordService(
      id,
      currentPassword,
      newPassword,
    );

    res.status(200).json({ success: true, message, data: [] });
  } catch (error) {
    next(error);
  }
};
