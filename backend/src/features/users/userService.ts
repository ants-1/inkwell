import { ApiError } from "../../utils/apiError";
import User, { IUser } from "../users/userModel";
import { userDataSchema, userPasswordSchema } from "./userValidation";

export const getUserService = async (id: string) => {
  const user: IUser | null = await User.findById(id).select("-password");

  if (!user) {
    throw new ApiError("User not found", 404, "NOT_FOUND");
  }

  return {
    user,
  };
};

export const updateUserService = async (
  id: string,
  username: string,
  email: string,
) => {
  const result = userDataSchema.safeParse({
    username,
    email,
  });

  if (!result.success) {
    throw result.error;
  }

  const existingUser = await User.findOne({
    _id: { $ne: id },
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    if (existingUser.username === username) {
      throw new ApiError("Username already taken", 400, "DUPLICATE_USERNAME");
    }

    if (existingUser.email === email) {
      throw new ApiError("Email already in use", 400, "DUPLICATE_EMAIL");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email },
    { new: true, runValidators: true },
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError("User not found", 404, "NOT_FOUND");
  }

  return {
    user: updatedUser,
  };
};

export const updateUserPasswordService = async (
  id: string,
  currentPassword: string,
  newPassword: string,
) => {
  if (currentPassword === newPassword) {
    throw new ApiError(
      "New password must be different",
      400,
      "VALIDATION_ERROR",
    );
  }

  const result = userPasswordSchema.safeParse({
    currentPassword,
    newPassword,
  });

  if (!result.success) {
    throw result.error;
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    throw new ApiError("User not found", 404, "NOT_FOUND");
  }

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new ApiError("Current password incorrect", 401, "AUTH_ERROR");
  }

  user.password = newPassword;

  await user.save();

  return {
    message: "Password updated successfully",
  };
};
