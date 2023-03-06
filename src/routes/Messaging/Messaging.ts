import { Request, Response, Router } from 'express';
import MessagingControllers from '../../controllers/Messaging/Messaging';

// Endpoint router
const routes = Router();

// Routes definition
routes
	.get('/', (request: Request, response: Response) => {
		response.setHeader('Content-Type', 'text/html; charset=UTF-8');
		response.render('messaging');
	});

export default routes;