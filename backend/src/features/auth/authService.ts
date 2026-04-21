import { generateToken } from "../../middleware/authMiddleware";
import User, { IUser } from "../users/userModel";

export const loginService = async (username: string, password: string) => {
  const user: IUser | null = await User.findOne({ username }).select(
    "+password",
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isValid: boolean = await user.comparePassword(password);

  if (!isValid) {
    throw new Error("Invalid username or password");
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
  if (!username || !email || !password) {
    throw new Error("Please fill all fields");
  }

  const existingUser: IUser | null = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser: IUser = await User.create({
    username,
    email,
    password,
  });

  const token = generateToken(newUser._id.toString());

  return {
    user: newUser,
    token,
  };
};
