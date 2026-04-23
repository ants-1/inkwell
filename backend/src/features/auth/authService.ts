import { generateToken } from "../../middleware/authMiddleware";
import { ApiError } from "../../utils/apiError";
import User, { IUser } from "../users/userModel";
import { loginSchema, registerSchema } from "./authValidation";

export const loginService = async (username: string, password: string) => {
  const result = loginSchema.safeParse({
    username,
    password,
  });

  if (!result.success) {
    throw result.error;
  } else {
    result.data;
  }

  const user: IUser | null = await User.findOne({ username }).select(
    "+password",
  );

  if (!user) {
    throw new ApiError("User not found", 404, "NOT_FOUND");
  }

  const isValid: boolean = await user.comparePassword(password);

  if (!isValid) {
    throw new ApiError("Incorrect credentials", 401, "AUTH_ERROR");
  }

  const token = generateToken(user._id.toString());

  return {
    user,
    token,
  };
};

export const registerService = async (
  username: string,
  email: string,
  password: string,
) => {
  const user = {
    username,
    email,
    password,
  };

  const result = registerSchema.safeParse(user);

  if (!result.success) {
    throw result.error;
  } else {
    result.data;
  }

  const existingUser: IUser | null = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError("User already exists", 400, "AUTH_ERROR");
  }

  const newUser: IUser = await User.create(user);

  const token = generateToken(newUser._id.toString());

  return {
    user: newUser,
    token,
  };
};
