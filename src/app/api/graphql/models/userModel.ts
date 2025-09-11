import mongoose, { Schema, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
  username: {
    type: String, 
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  }
});

export default mongoose.models.UserModel || mongoose.model<IUser, UserModel>("UserModel", userSchema);