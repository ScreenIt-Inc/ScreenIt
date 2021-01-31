import mongoose from 'mongoose';
import { Container } from 'typedi';
import { Logger } from 'winston';
import mongoose from 'mongoose';
import { IForm, IOpenFormUUID} from '../interfaces/IForm';
import { v4 as uuidv4 } from 'uuid';

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
	const formModel = Container.get('formModel') as mongoose.Model<IForm & mongoose.Document>;
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

export function newFormURL(res) {
	const Logger : Logger = Container.get('logger');
	const OpenFormUUIDModel = Container.get('OpenFormUUIDModel') as mongoose.Model<IOpenFormUUID & mongoose.Document>;
	let uuid = {'uuid':  uuidv4()};
	const newModel = new OpenFormUUIDModel(uuid);

	newModel
	      .save()
	      .then(doc => {
	        res.json({ success: true, data: doc });
	      })
	      .catch(err => {
	        console.log(err);
	        res.status(500).send({ error: err });
	      })
}

export async function getOpenFormUrls() {
	const formModel = Container.get('OpenFormUUIDModel') as mongoose.Model<IOpenFormUUID & mongoose.Document>;
	return formModel.find({});
}


// last arg to connect model to collection questionaire
export async function AddQuestion(question: string){
	const Logger : Logger = Container.get('logger');
	Logger.silly('Adding question', question);
	const results = await qModel.updateOne({_id: "600deff3cef12d5f393a3b49"}, { $addToSet: { questionnaire: {question, answers: ["Yes", "No"], isHeader: false}}})
	console.log(results)//should just be a single value, so pull all returns an array
  }

  export async function DeleteQuestion(questions: Array<string>){
	const Logger : Logger = Container.get('logger');
	Logger.silly('Deletingg question', questions);
	const results = await qModel.updateMany({_id: "600deff3cef12d5f393a3b49"}, { $pull: { questionnaire: {question: { $in: questions} }}})
	console.log(results)//should just be a single value, so pull all returns an array
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