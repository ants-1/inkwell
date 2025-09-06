import folderModel from "../models/folderModel";
import noteModel from "../models/noteModel";
import teamModel from "../models/teamModel";

export const teamResolvers = {
  Query: {
    teams: async () => {
      try {
        return await teamModel.find().populate("folders");
      } catch (error: any) {
        throw new Error("Failed to fetch teams:", error);
      }
    }
  },
  Mutation: {
    createTeam: async (_: any, { teamId, folderId, note }: any) => {
      const newNote = await noteModel.create(note);
      const folder = await folderModel.findByIdAndUpdate(
        folderId,
        { $push: { notes: newNote._id } },
        { new: true }
      ).populate("notes");
      return folder;
    },
  },
};