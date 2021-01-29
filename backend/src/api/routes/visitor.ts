import { Router, Request, Response } from "express";
const route = Router();
import { Logger } from "winston";
import { Container } from "typedi";
import middlewares from "../middlewares";
import mongoose from "mongoose";
import { IForm } from "../../interfaces/IForm";
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
      },
      (err, visitors) => {
        return res.send(visitors);
      }
    );
  });
};
