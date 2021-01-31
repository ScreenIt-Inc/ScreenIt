import mongoose from 'mongoose';
import { IEstablishment } from '../interfaces/IEstablishment';

const Establishment = new mongoose.Schema(
  {
    establishmentName: {
      type: String,
      required: [true, 'Please enter a full name'],
    },

    establishmentId: {
      type: String,
      lowercase: true,
      index: true,
    },

    maxCapacity: {
      type: Number,
      required: [true, 'Please enter valid capacity'],
    },

    notificationMessage: String,
  },
  { timestamps: true },
);

export default mongoose.model<IEstablishment & mongoose.Document>('Establishment', Establishment);
