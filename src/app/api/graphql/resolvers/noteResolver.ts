import noteModel from "../models/noteModel";

export const noteResolvers = {
  Query: {
    notes: async () => {
      try {
        return await noteModel.find();
      } catch (error: any) {
        throw new Error("Failed to fetch notes:", error);
      }
    },
  }, 
  Mutation: {},
};