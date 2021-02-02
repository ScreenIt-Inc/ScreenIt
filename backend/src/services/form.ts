import mongoose from 'mongoose';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { IForm, IOpenFormUUID} from '../interfaces/IForm';
import { v4 as uuidv4 } from 'uuid';

export async function updateTime(fieldToUpdate: string, fieldValue: Date, formId: string){
	const Logger : Logger = Container.get('logger');
	const formModel = Container.get('formModel') as mongoose.Model<IForm & mongoose.Document>;
	let results;
	if (fieldToUpdate == "entry_time"){
		results = await formModel.updateOne({_id: formId}, { entry_time: fieldValue  
		})
	} else if (fieldToUpdate == "exit_time"){
		results = await formModel.updateOne({_id: formId}, { exit_time: fieldValue  
		})
	}
	console.log(results);
  }

export async function formSubmit(data: Object){
	const Logger : Logger = Container.get('logger');
	const formModel = Container.get('formModel') as mongoose.Model<IForm & mongoose.Document>;
	const OpenFormUUIDModel = Container.get('OpenFormUUIDModel') as mongoose.Model<IOpenFormUUID & mongoose.Document>;
	const uuidData = await OpenFormUUIDModel.find({'uuid': data.uuid})
	if (!(uuidData)){
		return
	}

	data.temp = Number(uuidData[0].temp)
	Logger.verbose('Attemping Save...');
	const newCustomerData = new formModel(data);
	newCustomerData.save(async function (err) {
		if (err) return Logger.error(err);
		Logger.verbose('New form data saved');
		Logger.debug(JSON.stringify(data));
		await OpenFormUUIDModel.deleteOne({'uuid': data.uuid}); //remove the uuid now that its been used
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

export function newFormURL(res, temp) {
	const Logger : Logger = Container.get('logger');
	const OpenFormUUIDModel = Container.get('OpenFormUUIDModel') as mongoose.Model<IOpenFormUUID & mongoose.Document>;
	let uuid = {'uuid':  uuidv4(), 'temp': temp};
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