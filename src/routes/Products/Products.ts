import { Router } from 'express';
import ProductsControllers from "../../controllers/Products/Produts";
import AuthMiddlewares from "../Middlewares/Auth/Auth";

// Endpoint router
const routes = Router();

// Routes definition
routes
	.get('/', ProductsControllers.getAll)
	.get('/:id', ProductsControllers.get)
	.post('/', AuthMiddlewares.isAuthenticatedRequest, ProductsControllers.create)
	.put('/:id', AuthMiddlewares.isAuthenticatedRequest, ProductsControllers.update)
	.patch('/:id', AuthMiddlewares.isAuthenticatedRequest, ProductsControllers.update)
	.delete('/:id', AuthMiddlewares.isAuthenticatedRequest, ProductsControllers.delete);

export default routes;