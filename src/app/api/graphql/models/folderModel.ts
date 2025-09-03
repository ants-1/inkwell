import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IFolder extends Document {
  name: string;
  notes: Types.ObjectId[];
}

type FolderModel = Model<IFolder>;

const folderSchema = new Schema<IFolder, FolderModel>({
  name: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: "NoteModel" }],
});

export default mongoose.models.FolderModel || mongoose.model<IFolder, FolderModel>("FolderModel", folderSchema);
