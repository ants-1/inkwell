import userModel from "../models/userModel";
import bcrypt from "bcryptjs";

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await userModel.find().select("-password");
      } catch (error: any) {
        throw new Error("Failed to fetch users:", error.message);
      }
    },
    user: async (_: any, { _id }: { _id: string }) => {
      try {
        return await userModel.findById(_id).select("-password");
      } catch (error: any) {
        throw new Error("Failed to fetch user: " + error.message);
      }
    },
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
    },
    editUser: async (_: any, { _id, input }: { _id: string; input: any }) => {
      try {
        const updateData = { ...input };

        const updatedUser = await userModel
          .findByIdAndUpdate(_id, updateData, { new: true })
          .select("-password");

        if (!updatedUser) {
          throw new Error("User not found");
        }

        return updateData;
      } catch (error: any) {
        throw new Error("Failed to edit user:", error.message);
      }
    },
  },
};
