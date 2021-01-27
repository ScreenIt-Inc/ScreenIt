import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IEstablishment, IEstablishmentInputDTO } from '../interfaces/IEstablishment';

@Service()
export default class SettingService {
  constructor(
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


  public async GetGeneral(establishmentId: string): Promise<{ establishment: IEstablishment; }> {
    try {
        const establishmentRecord = await this.establishmentModel.findOne({ establishmentId });

      this.logger.silly('Record Found for Establishment!');

      const establishment = establishmentRecord.toObject();
      return {establishment};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
