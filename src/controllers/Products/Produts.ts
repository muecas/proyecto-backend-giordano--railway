import { Request, Response } from 'express';
import Products from '../../services/Products/Products';
import Product from '../../services/Products/Product';
import Validation, { ValidationResults } from '../../utils/Validation/Validation';
import logger from "../../services/Logger/Logger";

// Container
const storage: Products = Products.getInstance();

/**
 * ProductsControllers class
 * @class
 */

class ProductsControllers {
	
	/**
	 * Gets all products
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async getAll(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.getAll()
			.then((products: Array<Product>) => {
				response.send({ products : products.map(product => product.toObject()) });
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar los productos: ${err}`);
				response.json({ error : 'Ocurrió un error al intentar cargar los productos' });
			});
	}
	
	/**
	 * Gets a product
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async get(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.get(request.params.id)
			.then((result: Product | null) => {
				result !== null ?
					response.json({ product : result.toObject() }) :
					response.json({
						error : 'Producto no encontrado',
					});
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar el producto: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar cargar el producto',
				});
			});
	}
	
	/**
	 * Creates a product
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async create(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.create({
				name      : request.body.name,
				price     : Number(request.body.price),
				thumbnail : request.body.thumbnail
			})
			.then((result: ValidationResults | Product | boolean) => {
				if(result !== false) {
					Validation.isValidationResult(result as ValidationResults) === true && (result as ValidationResults).errors.length > 0 ?
						response.json({
							error  : 'Verifica los campos ingresados',
							errors : (result as ValidationResults).errors,
						}) :
						response.json({
							message : 'Producto creado con éxito',
							product : (result as Product).toObject()
						});
				} else {
					response.json({
						error : 'Ocurrió un error al intentar ingresar el producto',
					});
				}
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar ingresar el producto: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar ingresar el producto',
				});
			});
	}
	
	/**
	 * Updates a product
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async update(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.edit(request.params.id, {
				name      : request.body?.name || undefined,
				price     : request.body?.price ? Number(request.body.price) : undefined,
				thumbnail : request.body?.thumbnail || undefined
			})
			.then((result: Product | ValidationResults | boolean | null) => {
				if(result !== false) {
					if (result === null) {
						response.json({
							error : 'Producto no encontrado',
						});
					} else {
						Validation.isValidationResult(result as ValidationResults) === true && (result as ValidationResults).errors.length > 0 ?
							response.json({
								error  : 'Verifica los campos ingresados',
								errors : (result as ValidationResults).errors,
							}) :
							response.json({
								message : 'Producto editado con éxito',
								product : (result as Product).toObject(),
							});
					}
				} else {
					response.json({
						error : 'Ocurrió un error al intentar editar el producto',
					});
				}
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar editar el producto: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar editar el producto',
				});
			});
	}
	
	/**
	 * Deletes a product
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async delete(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.remove(request.params.id)
			.then((result: boolean | null) => {
				if(result !== false) {
					if(result === null) {
						response.json({
							error : 'Producto no encontrado',
						});
					} else {
						response.json({
							message : 'Producto eliminado con éxito',
						});
					}
				} else {
					response.json({
						error : 'Ocurrió un error al intentar eliminar el producto',
					});
				}
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar eliminar el producto: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar eliminar el producto',
				});
			});
	}
	
}

export default ProductsControllers;