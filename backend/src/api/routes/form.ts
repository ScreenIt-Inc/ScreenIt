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

	route.get("/getForms", function(req: Request, res: Response){
		  Logger.verbose(`Recieved get customers request`);
			FormService.getForms().then(function(data) {
			Logger.verbose(data);
			res.json(data); //sends json data back (only want the first value), method name 'json' is misleading
		});
	});

	route.get("/contactTrace", function(req: Request, res: Response){
		  Logger.verbose(`Recieved get customers request`);
			FormService.contactTrace().then(function(data) {
			Logger.verbose(data[0]);
			res.json(data); //sends json data back (only want the first value), method name 'json' is misleading
		});
	});

  	route.get("/opennewformuuid/*", function(req: Request, res: Response){
		    Logger.verbose(`Recieved new form endpoint get route`);
		    var temp = parseInt(req.params["0"])
		    var uuid = FormService.newFormURL(res, temp); //response handled by service this time, maybe worth moving here
		});

  	route.get("/openformuuids", function(req: Request, res: Response){
		    Logger.verbose(`Recieved new form endpoint get route`);
			FormService.getOpenFormUrls().then(function(data) {
				Logger.verbose(data);
				res.json(data);  //sends json data back (only want the first value), method name 'json' is misleading
			});
		});
};