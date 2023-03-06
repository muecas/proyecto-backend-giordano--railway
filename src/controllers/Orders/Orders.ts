import { Request, Response } from 'express';
import Orders from '../../services/Orders/Orders';
import Order, { OrderType } from '../../services/Orders/Order';
import Validation, { ValidationResults } from '../../utils/Validation/Validation';
import logger from "../../services/Logger/Logger";
import Carts from "../../services/Carts/Carts";
import Cart from "../../services/Carts/Cart";
import User from "../../services/Users/User";
import Email from "../../services/Email/Email";

// Container
const storage: Orders = Orders.getInstance();
const carts: Carts = Carts.getInstance();

/**
 * OrdersControllers class
 * @class
 */

class OrdersControllers {
	
	/**
	 * Gets all orders
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async getAll(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.getAllBy('user', String((request.user as User).toObject().id))
			.then((orders: Array<Order>) => {
				response.send({ orders : orders.map(order => order.toObject()) });
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar las ordenes: ${err}`);
				response.json({ error : 'Ocurrió un error al intentar cargar las ordenes' });
			});
	}
	
	/**
	 * Gets an order
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async get(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await storage
			.get(request.params.id)
			.then((result: Order | null) => {
				if(result !== null) {
					const resultObj: OrderType = result.toObject();
					if(String(resultObj.user) === String((request.user as User).toObject().id)) {
						response.json({ order : resultObj })
					} else {
						response.json({
							error : 'La orden no pertenece a tu usuario',
						});
					}
				} else {
					response.json({
						error : 'Orden no encontrada',
					});
				}
				
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar la orden: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar cargar la orden',
				});
			});
	}
	
	/**
	 * Creates an order
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async create(request: Request, response: Response) {
		response.setHeader('Content-Type', 'application/json; charset=UTF-8');
		await carts.get(request.params.id)
			.then(async (cart: Cart | null) => {
				if(cart !== null) {
					await storage
						.create((request.user as User).toObject().id, cart.toObject())
						.then(async (order: ValidationResults | Order | boolean) => {
							if(order !== false) {
								if(Validation.isValidationResult(order as ValidationResults) === true && (order as ValidationResults).errors.length > 0) {
									response.json({
										error  : 'Verifica los campos ingresados',
										errors : (order as ValidationResults).errors,
									});
								} else {
									const orderObj: OrderType = (order as Order).toObject();
									await carts.remove(request.params.id);
									let detail: string = (orderObj.products || []).map(line => `${line.name} (x${line.amount} - $ ${line.price})`).join('<br>');
									logger.log('info', `Nueva orden creada`);
									await Email.getInstance().send('Nueva orden generada', `<p>Orden ingresada con éxito.</p><p>Detalle de la orden:<br>${detail}</p><p>Cantidad de productos: ${orderObj.count}<br>Total: ${orderObj.total}</p>`);
									response.json({
										message : 'Orden creada con éxito',
										order   : orderObj,
									});
								}
							} else {
								response.json({
									error : 'Ocurrió un error al intentar ingresar la orden',
								});
							}
						})
						.catch(err => {
							logger.log('error', `Ocurrió un error al intentar ingresar la orden: ${err}`);
							response.json({
								error : 'Ocurrió un error al intentar ingresar la orden',
							});
						});
				} else {
					response.json({
						error : 'Carro de compras no encontrado',
					});
				}
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar el carro: ${err}`);
				response.json({
					error : 'Ocurrió un error al intentar cargar el carro',
				});
			});
	}
	
}

export default OrdersControllers;