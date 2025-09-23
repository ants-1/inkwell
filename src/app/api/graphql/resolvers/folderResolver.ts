import folderModel from "../models/folderModel";
import teamModel from "../models/teamModel";

export const folderResolvers = {
  Query: {
    folders: async () => {
      try {
        return await folderModel.find().populate("notes");
      } catch (error: any) {
        throw new Error("Failed to load folders: " + error.message);
      }
    },
    getTeamFolders: async (_: any, { teamId }: any) => {
      try {
        const team = await teamModel.findById(teamId).populate({
          path: "folders",
          populate: { path: "notes" },
        });
        if (!team) throw new Error("Team not found");
        return team.folders;
      } catch (error: any) {
        throw new Error("Failed to get team folders: " + error.message);
      }
    },
    getFoldersByUser: async (_: any, { userId }: any) => {
      try {
        const teams = await teamModel
          .find({ "members.user": userId })
          .populate({ path: "folders", populate: { path: "notes" } });
        return teams.flatMap((team) => team.folders);
      } catch (error: any) {
        throw new Error("Failed to get folders by user: " + error.message);
      }
    },
  },
  Mutation: {
    createFolder: async (_: any, { teamId, input }: any) => {
      try {
        // Create folder
        const newFolder = await folderModel.create({
          name: input.name,
          notes: input.notes?.map((n: any) => n._id) || [],
        });
        await newFolder.populate("notes");

        // Add folder to team
        await teamModel.findByIdAndUpdate(teamId, {
          $push: { folders: newFolder._id },
        });

        return newFolder;
      } catch (error: any) {
        throw new Error("Failed to create folder: " + error.message);
      }
    },

    editFolder: async (_: any, { _id, input }: any) => {
      try {
        const updatedFolder = await folderModel
          .findByIdAndUpdate(
            _id,
            {
              name: input.name,
              notes: input.notes?.map((n: any) => n._id) || [],
            },
            { new: true }
          )
          .populate("notes");

        if (!updatedFolder) throw new Error("Folder not found");
        return updatedFolder;
      } catch (error: any) {
        throw new Error("Failed to edit folder: " + error.message);
      }
    },

    deleteFolder: async (_: any, { _id }: any) => {
      try {
        const folder = await folderModel.findById(_id);
        if (!folder) throw new Error("Folder not found");

        // Remove folder from any team referencing it
        await teamModel.updateMany(
          { folders: _id },
          { $pull: { folders: _id } }
        );

        await folderModel.findByIdAndDelete(_id);
        return true;
      } catch (error: any) {
        throw new Error("Failed to delete folder: " + error.message);
      }
    },
  },
};
