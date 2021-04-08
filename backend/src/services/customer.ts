import { Container } from "typedi";
import { Logger } from "winston";
import mongoose from "mongoose";
import { ICustomer } from "../interfaces/ICustomer";

//this might be the wrong place for this but ill fix as I learn
export function createCustomer(data: Object) {
  const Logger: Logger = Container.get("logger");
  const customerModel = Container.get("customerModel") as mongoose.Model<
    IForm & mongoose.Document
  >;
  const newCustomerData = new customerModel(data);
  Logger.verbose("Attemping Save...");
  newCustomerData.save(function (err) {
    if (err) return Logger.error("New customer not saved " + err);
    Logger.verbose("New customer data saved");
    Logger.debug(JSON.stringify(data));
  });
}

export function updateCustomer(data: Object) {
  const Logger: Logger = Container.get("logger");
  try {
    Logger.verbose("Creating user db record");
    const query = {},
      update = { ...data },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const customerModel = Container.get("customerModel") as mongoose.Model<
      ICustomer & mongoose.Document
    >;
    const updatedRecord = customerModel.findOneAndUpdate(
      query,
      update,
      options
    );
    Logger.verbose("updated Record");
    const record = updatedRecord.toObject();
    return JSON.stringify(record);
  } catch (e) {
    Logger.verbose(e);
    throw e;
  }
}

export function getCustomers() {
  const Logger: Logger = Container.get("logger");
  const customerModel = Container.get("customerModel") as mongoose.Model<
    IForm & mongoose.Document
  >;
  return customerModel.find({}); //should just be a single value, so pull all returns an array
}
