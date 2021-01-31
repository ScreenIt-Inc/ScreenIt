import mongoose from 'mongoose';
import { IForm, IOpenFormUUID } from '../interfaces/IForm';

const Form = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      index: true
    },
    temp: {
      type: Number,
      required: true,
    },
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
      unique: false,
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
      required: false,
    },
    exit_time: {
      type: Date,
      required: false,
    },
    questionnaire: {
      type: Array,
      required: true,
    },

  },
  { timestamps: true },
);

exports.Form = mongoose.model<IForm & mongoose.Document>('Form', Form);


const OpenFormUUID = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    temp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
exports.OpenFormUUIDModel = mongoose.model<IOpenFormUUID & mongoose.Document>('OpenFormUUID', OpenFormUUID);