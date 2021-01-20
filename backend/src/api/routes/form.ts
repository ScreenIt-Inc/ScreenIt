import { Router, Request, Response, NextFunction } from 'express';
const route = Router()
import { Logger } from 'winston';
import { Container } from 'typedi';

export default (app: Router) => {
	app.use('/form', route);
	const Logger : Logger = Container.get('logger');

  	route.post("/testurl", function(req: Request, res: Response, next: NextFunction){
		    console.log(req.body);
		    Logger.info(`FINALLY IT WENT THROUGH`);
		    res.send("response");
		});

};
