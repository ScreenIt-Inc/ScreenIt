import { Router, Request, Response } from 'express';
import Logger from '../../loaders/logger';

const route = Router(),
	bodyParser = require('body-parser');


export default (app: Router) => {
	app.use('/form', route);
	app.use(bodyParser.json());


  	route.post("/testurl", function(req,res,next){
		    console.log(req.body);
		    Logger.info(`FINALLY IT WENT THROUGH`);
		    res.send("response");
		});

};
