import { celebrate, Joi } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { IEstablishmentInputDTO } from '../../interfaces/IEstablishment';
import { IUserInputDTO } from '../../interfaces/IUser';
import SettingService from '../../services/settings';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/settings', route);

  route.post(
    '/saveGeneral',middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        establishmentName: Joi.string().required(),
        maxCapacity: Joi.number().required(),
        notificationMessage: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Save-General endpoint with body: %o', req.body );
      try {
        const settingServiceInstance = Container.get(SettingService);
        await settingServiceInstance.Save(req.body as IEstablishmentInputDTO, req.currentUser.establishmentId);
        return res.status(201).json({ success: true });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/getSettings',middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Get-General endpoint with body: %o', req.body );
      try {
        const settingServiceInstance = Container.get(SettingService);
        const {establishment, userRecord } = await settingServiceInstance.GetGeneral(req.currentUser.establishmentId);
        return res.status(201).json({ generalSettings: establishment, permissions: userRecord });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/addUser',middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Add-User endpoint with body: %o', req.body );
      try {
        const settingServiceInstance = Container.get(SettingService);
        await settingServiceInstance.AddUser(req.body as IUserInputDTO, req.currentUser.establishmentId);
        return res.status(201).json({ success: true });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/saveUser',middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        role: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Edit-User endpoint with body: %o', req.body );
      try {
        const settingServiceInstance = Container.get(SettingService);
        await settingServiceInstance.SaveUser(req.body as IUserInputDTO, req.currentUser.establishmentId);
        return res.status(201).json({ success: true });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/deleteUser',middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        role: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Delete-User endpoint with body: %o', req.body );
      try {
        const settingServiceInstance = Container.get(SettingService);
        await settingServiceInstance.DeleteUser(req.body as IUserInputDTO, req.currentUser.establishmentId);
        return res.status(201).json({ success: true });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/addQuestion',middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        question: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Save-General endpoint with body: %o', req.body );
      try {
        const settingServiceInstance = Container.get(SettingService);
        await settingServiceInstance.Save(req.body as IEstablishmentInputDTO, req.currentUser.establishmentId);
        return res.status(201).json({ success: true });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/deleteQuestion',middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        question: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Save-General endpoint with body: %o', req.body );
      try {
        const settingServiceInstance = Container.get(SettingService);
        await settingServiceInstance.Save(req.body as IEstablishmentInputDTO, req.currentUser.establishmentId);
        return res.status(201).json({ success: true });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

};
