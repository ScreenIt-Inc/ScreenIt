import { Request, Response, Router } from 'express';
import config from "../../config";
import middlewares from '../middlewares';

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
const route = Router();

export default (app: Router) => {
  app.use('/notify', route);

  route.post('/sendText', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    var response = "";
  client.messages
    .create({
      body: req.body.msg,
      from: config.twilio.number,
      to: req.body.phoneNumber
    })
    .then(message => {response = message})
    .catch(error => console.log(error));
    return res.json({ res: response }).status(200);
  })

  route.post('/alertAtRisk', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    var response = "";
    req.body.numbers.forEach((number) => {
      console.log(number)
      client.messages
      .create({
        body: "You may be at risk for Covid. Please get tested",
        from: config.twilio.number,
        to: number
      })
      .then(message => {response = message})
      .catch(error => console.log(error));
    })

    return res.json({ res: response }).status(200);
  });
};

