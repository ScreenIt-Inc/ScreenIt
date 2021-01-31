import dependencyInjectorLoader from './dependencyInjector';
//We have to import at least all the events once so they can be triggered
import './events';
import expressLoader from './express';
import jobsLoader from './jobs';
import Logger from './logger';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  //if questionaire does not exist, push default here

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };

  const formModel = {
    name: 'formModel',
    // Notice the require syntax and the '.default'
    model: require('../models/form').Form,
  };

  const customerModel = {
    name: 'customerModel',
    // Notice the require syntax and the '.default'
    model: require('../models/customer').default,
  }


  const openFormUUIDModel = {
    name: 'OpenFormUUIDModel',
    // Notice the require syntax and the '.default'
    model: require('../models/form').OpenFormUUIDModel,
  };

  const establishmentModel = {
    name: 'establishmentModel',
    // Notice the require syntax and the '.default'
    model: require('../models/establishment').default,
  }
  
  const OpenFormUUIDModel = {
    name: 'OpenFormUUIDModel',
    // Notice the require syntax and the '.default'
    model: require('../models/form').OpenFormUUIDModel,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      formModel,
      customerModel,
      openFormUUIDModel,
      establishmentModel,
      OpenFormUUIDModel,
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
