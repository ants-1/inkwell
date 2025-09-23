import folderModel from "../models/folderModel";
import noteModel from "../models/noteModel";

export const noteResolvers = {
  Query: {
    getNotesByFolder: async (_: any, { folderId }: any) => {
      try {
        const folder = await folderModel.findById(folderId).populate("notes");
        if (!folder) throw new Error("Folder not found");
        return folder.notes || [];
      } catch (error: any) {
        throw new Error("Failed to fetch notes: " + error.message);
      }
    },

    getNote: async (_: any, { _id }: any) => {
      try {
        return await noteModel.findById(_id);
      } catch (error: any) {
        throw new Error("Failed to fetch note: " + error.message);
      }
    },
  },

  Mutation: {
    createNote: async (_: any, { folderId, input }: any) => {
      try {
        const note = await noteModel.create({
          ...input,
          date: input.date ? new Date(input.date) : new Date(),
        });

        await folderModel.findByIdAndUpdate(folderId, {
          $push: { notes: note._id },
        });

        return note;
      } catch (error: any) {
        throw new Error("Failed to create note: " + error.message);
      }
    },

    editNote: async (_: any, { _id, input }: any) => {
      try {
        const updatedNote = await noteModel.findByIdAndUpdate(
          _id,
          { ...input, date: input.date ? new Date(input.date) : undefined },
          { new: true }
        );

        if (!updatedNote) throw new Error("Note not found");
        return updatedNote;
      } catch (error: any) {
        throw new Error("Failed to edit note: " + error.message);
      }
    },

    deleteNote: async (_: any, { _id, folderId }: any) => {
      try {
        const note = await noteModel.findById(_id);
        if (!note) throw new Error("Note not found");

        await folderModel.findByIdAndUpdate(folderId, {
          $pull: { notes: _id },
        });

        await noteModel.findByIdAndDelete(_id);
        return true;
      } catch (error: any) {
        throw new Error("Failed to delete note: " + error.message);
      }
    },
  },
};
