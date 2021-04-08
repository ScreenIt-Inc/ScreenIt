import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, "Please enter valid email"],
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: "user",
    },

    establishmentId: {
      type: String,
      required: [true, "Please enter valid ID"],
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser & mongoose.Document>("User", User);
