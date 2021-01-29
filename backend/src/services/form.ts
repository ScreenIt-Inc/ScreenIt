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

export async function getForms(){
	const Logger : Logger = Container.get('logger');
	const formModel = Container.get('formModel') as mongoose.Model<IForm & mongoose.Document>;
	//Logger.debug(JSON.stringify(formModel));
	return formModel.find({});
}

export function contactTrace(data: Object){
	const Logger : Logger = Container.get('logger');
	const formModel = Container.get('formModel') as mongoose.Model<IForm & mongoose.Document>;
	//var formModel = mongoose.model('Forms', new mongoose.Schema({ 'forms': []}), 'forms');
	//Logger.debug(JSON.stringify(data));
	return formModel.find({});
}


var qModel = mongoose.model('Questionnaire', new mongoose.Schema({ 'questionnaire': []}), 'questionnaire'); // last arg to connect model to collection questionaire
export async function formPull(){
	const Logger : Logger = Container.get('logger');
	return qModel.find({}) //should just be a single value, so pull all returns an array
}