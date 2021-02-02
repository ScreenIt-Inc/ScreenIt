import { Document, Model } from 'mongoose';
import { IEstablishment } from '../../interfaces/IEstablishment';
import { IForm } from '../../interfaces/IForm';
import { IUser } from '../../interfaces/IUser';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type EstablishmentModel = Model<IEstablishment & Document>;
    export type FormModel = Model<IForm & Document>;
  }
}
