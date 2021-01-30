import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IEstablishment, IEstablishmentInputDTO } from '../interfaces/IEstablishment';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
@Service()
export default class SettingService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('establishmentModel') private establishmentModel: Models.EstablishmentModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async Save(establishmentInputDTO: IEstablishmentInputDTO, establishmentId: string): Promise<{ establishment: IEstablishment; }> {
    try {
      this.logger.silly('Creating user db record');
      const query = {},
      update = { ...establishmentInputDTO, establishmentId },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const establishmentRecord = await this.establishmentModel.findOneAndUpdate(query, update, options)
      this.logger.silly('Settings Saved');
      const establishment = establishmentRecord.toObject();
      return {establishment};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async GetGeneral(establishmentId: string) {
    try {
      const establishmentRecord = await this.establishmentModel.findOne({ establishmentId });
      const userRecord = await this.userModel.find({ establishmentId });

      this.logger.silly('Record Found for Establishment and Users!');

      const establishment = establishmentRecord.toObject();
      // const users = userRe;cord.toObectArray();
      return { establishment, userRecord};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async AddUser(userInputDTO: IUserInputDTO, establishmentId: string): Promise<{ user: IUser; }> {
    try {
      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      this.logger.silly(establishmentId);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      const input = { ...userInputDTO, establishmentId }
      const userRecord = await this.userModel.create({
        ...input,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
  
      if (!userRecord) {
        throw new Error('User cannot be created');
      }
  
      this.logger.silly('User Added');
      const user = userRecord.toObject();
      return {user};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SaveUser(userInputDTO: IUserInputDTO, establishmentId: string): Promise<{ user: IUser; }> {
    try {
      this.logger.silly('Creating user db record');
      const query = { email: userInputDTO.email },
      update = { ...userInputDTO, establishmentId },
      options = { upsert: false  };
      const userRecord = await this.userModel.findOneAndUpdate(query, update, options)
      this.logger.silly('User Saved');
      const user = userRecord.toObject();
      return {user};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async DeleteUser(userInputDTO: IUserInputDTO, establishmentId: string): Promise<{ user: IUser; }> {
    try {
      this.logger.silly('Creating user db record');
      const deleteUser = { email: userInputDTO.email, establishmentId }
      const userRecord = await this.userModel.findOneAndDelete(deleteUser)
      this.logger.silly('User Delete');
      const user = userRecord.toObject();
      return {user};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}


