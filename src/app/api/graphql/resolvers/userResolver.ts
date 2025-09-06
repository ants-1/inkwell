import userModel from "../models/userModel";
import bcrypt from "bcryptjs";

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await userModel.find();
      } catch (error: any) {
        throw new Error("Failed to fetch users:", error.message);
      }
    }
  },
  Mutation: {
    createUser: async (_: any, { input }: any) => {
      try {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await userModel.create({
          ...input,
          password: hashedPassword,
        });
        return user;
      } catch (error: any) {
        throw new Error("Failed to create user:", error.message);
      }
    }
  }
};