import { Router, Request, Response, NextFunction } from "express";
const route = Router();
import { celebrate, Joi } from 'celebrate';
import { Logger } from "winston";
import { Container } from "typedi";
import middlewares from "../middlewares";
import mongoose from "mongoose";
import { IForm } from "../../interfaces/IForm";
import * as FormService from '../../services/form';
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";

export default (app: Router) => {
  app.use("/visitors", route);
  const Logger: Logger = Container.get("logger");

  route.get("/getInfo", middlewares.isAuth, (req: Request, res: Response) => {
    const formModel = Container.get("formModel") as mongoose.Model<
      IForm & mongoose.Document
    >;
    formModel.find(
      {
        createdAt: {
          $gte: startOfDay(new Date()),
          $lte: endOfDay(new Date()),
        },
        exit_time: null,
      },
      (err, visitors) => {
        return res.send(visitors);
      }
    );
  });

  // post edit entry time
  route.post(
    '/updateInfo',middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        field: Joi.string().required(),
        value: Joi.date().required(),
        id: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling updateInfo endpoint with body: %o', req.body );
      try {
        await FormService.updateTime(req.body.field, req.body.value, req.body.id);
        return res.status(201).json({ success: true });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
