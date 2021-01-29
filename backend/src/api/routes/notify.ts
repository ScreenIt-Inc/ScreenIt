import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import config from "../../config";
import { Logger } from 'winston';

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
      body: 'Thank you for your patience. Please make your way in!',
      from: '+12266405423',
      to: req.body.phoneNumber
    })
    .then(message => {response = message});

    return res.json({ res: response }).status(200);
  });
};

