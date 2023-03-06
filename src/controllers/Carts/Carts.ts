import { Request, Response } from 'express';
import Carts from '../../services/Carts/Carts';
import Cart, { CartProduct } from '../../services/Carts/Cart';
import logger from "../../services/Logger/Logger";

// Container
const storage: Carts = Carts.getInstance();

/**
 * CartsControllers class
 * @class
 */

class CartsControllers {
	
	/**
	 * Gets a cart
	 * @param {Request} request
	 * @param {Response} response
	 */
	
	static async get(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.get(request.params.id)
			.then((result: Cart | null) => {
				result !== null ?
					response.json({ cart : (result as Cart).toObject() }) :
					response.json({
						error : 'Carro de compras no encontrado',
					});
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar el carro: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar cargar el carro',
				});
			});
	}
	
	/**
	 * Creates a cart
	 * @param {Request} request
	 * @param {Response} response
	 */
	
	static async create(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.create()
			.then((result: Cart | boolean) => {
				result !== false ?
					response.json({
						message : 'Carro creado con éxito',
						cart    : (result as Cart).toObject(),
					}) :
					response.json({
						error : 'Ocurrió un error al intentar ingresar el carro',
					});
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar ingresar el carro: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar ingresar el carro',
				});
			});
	}
	
	/**
	 * Delete cart
	 * @param {Request} request
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
							error : 'Carro de compras no encontrado',
						});
					} else {
						response.json({
							message : 'Carro de compras eliminado con éxito',
						})
					}
				} else {
					response.json({
						error : 'Ocurrió un error al intentar eliminar el carro',
					});
				}
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar eliminar el carro: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar eliminar el carro',
				});
			});
	}
	
	/**
	 * Get cart products
	 * @param {Request} request
	 * @param {Response} response
	 */
	
	static async getProducts(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.get(request.params.id)
			.then((result: Cart | null) => {
				result !== null ?
					response.json({
						products : (result as Cart).getProducts(),
					}) :
					response.json({
						error : 'Carro de compras no encontrado',
					});
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar los productos del carro: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar cargar los productos del carro',
				});
			});
	}
	
	/**
	 * Add products to cart
	 * @param {Request} request
	 * @param {Response} response
	 */
	
	static async addProducts(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		const products: Array<CartProduct> = request.body.products.map((product: { id: string, amount?: string }) => ({ id : product.id, amount : Number(product.amount) }));
		await storage
			.addToCart(request.params.id, products)
			.then((result: Cart | null | boolean) => {
				if(result !== false) {
					if(result === null) {
						response.json({
							error : 'Carro de compras no encontrado',
						});
					} else {
						response.json({
							message : 'Productos agregados al carro con éxito',
							cart    : result
						})
					}
				} else {
					response.json({
						error : 'Ocurrió un error al intentar editar el carro',
					});
				}
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar agregar el producto al carro: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar agregar el producto el carro',
				});
			});
	}
	
	/**
	 * Delete product from cart
	 * @param {Request} request
	 * @param {Response} response
	 */
	
	static async deleteProduct(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.removeFromCart(request.params.id, request.params.product_id)
			.then((result: Cart | null | boolean) => {
				if(result !== false) {
					if(result === null) {
						response.json({
							error : 'Carro de compras no encontrado',
						});
					} else {
						response.json({
							message : 'Producto eliminado al carro con éxito',
							cart    : (result as Cart).toObject()
						})
					}
				} else {
					response.json({
						error : 'Ocurrió un error al intentar editar el carro',
					});
				}
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar eliminar el producto del carro: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar eliminar el producto del carro',
				});
			});
	}
	
}

export default CartsControllers;