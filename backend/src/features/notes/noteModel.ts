import { Schema, model, Document, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  user: Types.ObjectId;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 256,
    },
    content: {
      type: String,
      required: true,
      minLength: 3,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Note = model<INote>("Note", noteSchema);
export default Note;
