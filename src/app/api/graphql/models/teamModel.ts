import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMember {
  name: string;
}

export interface ITeam extends Document {
  name: string;
  members: IMember[];
  folders: Types.ObjectId[]; 
}

type TeamModel = Model<ITeam>;

const teamSchema = new Schema<ITeam, TeamModel>({
  name: { type: String, required: true },
  members: [{ name: { type: String, required: true } }],
  folders: [{ type: Schema.Types.ObjectId, ref: "FolderModel" }],
});

export default mongoose.models.TeamModel || mongoose.model<ITeam, TeamModel>("TeamModel", teamSchema);