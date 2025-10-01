import mongoose, { Schema, Model } from "mongoose";

export interface INote extends Document {
  author: string;
  content: string;
  date: string;
  tags: string[];
}

type NoteModel = Model<INote>;

const noteSchema = new Schema<INote, NoteModel>({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  tags: [
    { type: String }
  ]
});

export default mongoose.models.NoteModel || mongoose.model<INote, NoteModel>("NoteModel", noteSchema);
