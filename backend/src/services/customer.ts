import { Container } from 'typedi';
import { Logger } from 'winston';
import mongoose from 'mongoose';
import { ICustomer } from '../interfaces/ICustomer';

//this might be the wrong place for this but ill fix as I learn
export function createCustomer(data: Object){
	const Logger : Logger = Container.get('logger');
	const customerModel = Container.get('customerModel') as mongoose.Model<IForm & mongoose.Document>;
	const newCustomerData = new customerModel(data);
	Logger.verbose('Attemping Save...');
	newCustomerData.save(function (err) {
		if (err) return Logger.error('New customer not saved ' + err);
		Logger.verbose('New customer data saved');
		Logger.debug(JSON.stringify(data));
	});
}
/*
export default function updateCustomer(data: Object){
	const Logger : Logger = Container.get('logger');

	const customerModel = Container.get('customerModel') as mongoose.Model<ICustomer & mongoose.Document>;
	const newCustomerData = customerModel.findOne();

	newCustomerData.save(function (err) {
		if (err) return Logger.error('New customer data not saved');
		Logger.verbose('New customer data saved');
		Logger.debug(JSON.stringify(data));
	});
}
*/

export function getCustomers(){
	const Logger : Logger = Container.get('logger');
	const customerModel = Container.get('customerModel') as mongoose.Model<IForm & mongoose.Document>;
	return customerModel.find({}); //should just be a single value, so pull all returns an array
}
