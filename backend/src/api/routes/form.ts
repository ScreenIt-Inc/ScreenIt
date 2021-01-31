import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import * as FormService from '../../services/form';
const route = Router()

export default (app: Router) => {
	app.use('/form', route);
	const Logger : Logger = Container.get('logger');

  	route.post("/submission", function(req: Request, res: Response, next: NextFunction){
		    Logger.verbose(`Recieved form submission route`);
			Logger.debug(JSON.stringify(req.body));
			FormService.formSubmit(req.body); //send er to the service for database save
		    res.send("response");
		});

  	route.get("/questionnaire", function(req: Request, res: Response){
		    Logger.verbose(`Recieved form get route`);
			FormService.formPull().then(function(data) {
				Logger.verbose(data[0]);
				res.json(data[0]);  //sends json data back (only want the first value), method name 'json' is misleading
			});
		});

  	route.get("/opennewformuuid", function(req: Request, res: Response){
		    Logger.verbose(`Recieved new form endpoint get route`);
		    const uuid = FormService.newFormURL();
			res.json(uuid)
		});

  	route.get("/openformuuids", function(req: Request, res: Response){
		    Logger.verbose(`Recieved new form endpoint get route`);
			FormService.newFormURL().then(function(data) {
				Logger.verbose(data);
				res.json(data);  //sends json data back (only want the first value), method name 'json' is misleading
			});
		});
};