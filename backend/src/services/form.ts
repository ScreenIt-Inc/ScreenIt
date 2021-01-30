import mongoose from 'mongoose';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { IForm } from '../interfaces/IForm';
 
//this might be the wrong place for this but ill fix as I learn
export default function formSubmit(data: Object){
	const Logger : Logger = Container.get('logger');

	const formModel = Container.get('formModel') as mongoose.Model<IForm & mongoose.Document>;
	const newCustomerData = new formModel(data);

	newCustomerData.save(function (err) {
		if (err) return Logger.error('New form data not saved');
		Logger.verbose('New form data saved');
		Logger.debug(JSON.stringify(data));
	});

}
