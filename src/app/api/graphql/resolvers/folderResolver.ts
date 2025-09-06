import folderModel from "../models/folderModel";

export const folderResolvers = {
  Query: {
    folders: async () => {
      try {
        return await folderModel.find();
      } catch (error: any) {
        throw new Error("Failed to load folders: ", error)
      }
    }
  },
  Mutation: {},
};
