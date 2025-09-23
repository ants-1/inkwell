import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface IMember {
  user: ObjectId;
  role: "host" | "member";
}

export interface ITeam extends Document {
  name: string;
  members: IMember[];
  folders: ObjectId[];
  teamType: "default" | "custom";
}

type TeamModel = Model<ITeam>;

const teamSchema = new Schema<ITeam, TeamModel>({
  name: { type: String, required: true },
  members: [
    {
      user: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
      role: {
        type: String,
        required: true,
        default: "member",
        enum: ["host", "member"],
      },
    },
  ],
  folders: [{ type: Schema.Types.ObjectId, ref: "FolderModel" }],
  teamType: {
    type: String,
    required: true,
    default: "custom",
    enum: ["default", "custom"],
  },
});

export default mongoose.models.TeamModel ||
  mongoose.model<ITeam, TeamModel>("TeamModel", teamSchema);
