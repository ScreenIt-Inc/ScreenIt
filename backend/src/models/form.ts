import { IForm } from '../interfaces/IForm';
import mongoose from 'mongoose';

const Form = new mongoose.Schema(
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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    entry_time: {
      type: Date,
      required: true,
    },
    exit_time: {
      type: Date,
      required: true,
    },
    questionnaire: {
      type: Array,
      required: true,
    },

  },
  { timestamps: true },
);

export default mongoose.model<IForm & mongoose.Document>('Form', Form);
