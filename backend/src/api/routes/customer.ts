import { Router, Request, Response, NextFunction } from "express";
const route = Router();
import { Logger } from "winston";
import { Container } from "typedi";
import createCustomer from "../../services/customer";
import * as CustomerService from "../../services/customer";

export default (app: Router) => {
  app.use("/customer", route);
  const Logger: Logger = Container.get("logger");

  route.post(
    "/create",
    function (req: Request, res: Response, next: NextFunction) {
      Logger.verbose(`Recieved create new customer request`);
      Logger.debug(JSON.stringify(req.body));
      CustomerService.createCustomer(req.body);
      res.send("response");
    }
  );

  route.post(
    "/update",
    function (req: Request, res: Response, next: NextFunction) {
      Logger.verbose(`Recieved update customer request`);
      Logger.debug(JSON.stringify(req.body));
      CustomerService.updateCustomer(req.body);
      res.send("response");
    }
  );

  route.get("/getCustomers", function (req: Request, res: Response) {
    Logger.verbose(`Recieved get customers request`);
    CustomerService.getCustomers().then(function (data) {
      Logger.verbose(data[0]);
      res.json(data); //sends json data back (only want the first value), method name 'json' is misleading
    });
  });
};
