import { Router, Request, Response, NextFunction } from 'express';
import Logger from '../../loaders/logger';

const route = Router()


export default (app: Router) => {
	app.use('/form', route);

  	route.post("/testurl", function(req: Request, res: Response, next: NextFunction){
		    console.log(req.body);
		    Logger.info(`FINALLY IT WENT THROUGH`);
		    res.send("response");
		});

};
