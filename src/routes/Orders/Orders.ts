import { Router } from 'express';
import OrdersControllers from '../../controllers/Orders/Orders';
import AuthMiddlewares from "../Middlewares/Auth/Auth";

// Endpoint router
const routes = Router();

// Routes definition
routes
	.get('/', AuthMiddlewares.isAuthenticatedRequest, OrdersControllers.getAll)
	.get('/:id', AuthMiddlewares.isAuthenticatedRequest, OrdersControllers.get)
	.post('/create/:id', AuthMiddlewares.isAuthenticatedRequest, OrdersControllers.create);

export default routes;