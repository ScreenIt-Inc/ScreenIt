import { Router } from "express";
import auth from "./routes/auth";
import user from "./routes/user";
import agendash from "./routes/agendash";
import form from "./routes/form";
import visitor from "./routes/visitor";
import Logger from "../loaders/logger";
// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  form(app);
  visitor(app);

  Logger.info(JSON.stringify(app.stack));
  return app;
};
