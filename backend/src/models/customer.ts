import { ICustomer } from "../interfaces/IForm";
import mongoose from "mongoose";

const Customer = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    groupsize: {
      type: Number,
      required: false,
    },
    temperature: {
      type: Number,
      required: false,
    },
    entryTime: {
      type: Date,
      required: false,
    },
    exitTime: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICustomer & mongoose.Document>(
  "Customer",
  Customer
);
