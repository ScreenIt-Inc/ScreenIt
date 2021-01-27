import { Router } from 'express';
import Logger from '../loaders/logger';
import agendash from './routes/agendash';
import auth from './routes/auth';
import form from './routes/form';
import settings from './routes/settings';
import user from './routes/user';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	agendash(app);
	form(app);
	settings(app);

	Logger.info(JSON.stringify(app.stack))
	return app
}