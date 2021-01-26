import { Router, Request, Response, NextFunction } from 'express';
const route = Router()
import { Logger } from 'winston';
import { Container } from 'typedi';
import formSubmit from '../../services/form';

export default (app: Router) => {
	app.use('/form', route);
	const Logger : Logger = Container.get('logger');

  	route.post("/submission", function(req: Request, res: Response, next: NextFunction){
		    Logger.verbose(`Recieved new form route`);
			Logger.debug(JSON.stringify(req.body));
			formSubmit(req.body); //send er to the service for database save
		    res.send("response");
		});

};
