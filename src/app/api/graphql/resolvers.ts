import userModel from "./models/userModel";
import bcrypt from "bcryptjs";

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await userModel.find();
      } catch (err) {
        throw new Error("Failed to fetch users");
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
      } catch (err) {
        throw new Error("Failed to create user");
      }
    },
  },
};


export default resolvers;