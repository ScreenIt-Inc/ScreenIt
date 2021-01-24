import { Container } from 'typedi';
import { Logger } from 'winston';
import mongoose from 'mongoose';
import { IForm } from '../interfaces/IForm';

//this might be the wrong place for this but ill fix as I learn
export function formSubmit(data: Object){

	const Logger : Logger = Container.get('logger');
	const formModel = Container.get('formModel') as mongoose.Model<IForm & mongoose.Document>;
	const newCustomerData = new formModel(data);
	Logger.verbose('Attemping Save...');
	newCustomerData.save(function (err) {
		if (err) return Logger.error('New form data not saved');
		Logger.verbose('New form data saved');
		Logger.debug(JSON.stringify(data));
	});


}


var qModel = mongoose.model('Questionnaire', new mongoose.Schema({ 'questionnaire': []}), 'questionnaire'); // last arg to connect model to collection questionaire
export async function formPull(){
	const Logger : Logger = Container.get('logger');
	console.log(await qModel.find({}))
	return qModel.find({}) //should just be a single value, so pull all returns an array
}