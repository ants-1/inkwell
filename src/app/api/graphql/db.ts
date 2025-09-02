import mongoose from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    if (mongoDbUrl) {
      await mongoose.connect(mongoDbUrl);
      console.log("Connected to database successfully");
    } 
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;