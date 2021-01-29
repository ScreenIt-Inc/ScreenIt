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

// to generate UUID https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function newFormURL() {
	const OpenFormUUIDModel = Container.get('OpenFormUUIDModel') as mongoose.Model<IOpenFormUUID & mongoose.Document>;
	let uuid = {'uuid':  uuidv4()};
	const newModel = new OpenFormUUIDModel(uuid);
	newModel.save(function (err) {
		if (err) return Logger.error('New uuid not saved');
		Logger.verbose('New uuid saved');
		Logger.debug(JSON.stringify(uuid));
	});
	return uuid
}
