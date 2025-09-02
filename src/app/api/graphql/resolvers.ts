import userModel from "./models/userModel";

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
        return await userModel.create(input);
      } catch (err) {
        throw new Error("Failed to create user");
      }
    },
  },
};


export default resolvers;