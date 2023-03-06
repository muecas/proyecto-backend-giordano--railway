import { config, Container } from "../../data-access/data-access";
import { ConnectionConfig } from "../../config/ConnectionConfig";
import { CartProduct, CartType } from "../Carts/Cart";
import Validation, { ValidationResults } from "../../utils/Validation/Validation";
import Order, { OrderType, OrderTotalsType } from "./Order";
import Product, { ProductType } from "../Products/Product";

/**
 * Orders class
 * @class
 */

class Orders extends Container {
	
	readonly aggregationFields: object = {
		$project : {
			_id       : 0,
			id        : '$_id',
			user      : 1,
			products  : 1,
			total     : 1,
			count     : 1,
			timestamp : 1
		}
	};
	static instance: Orders;
	
	/**
	 * Constructor
	 * @param {ConnectionConfig} config
	 */
	
	private constructor(config: ConnectionConfig) {
		
		// Super constructor
		super(config, 'orders');
		
	}
	
	/**
	 * Gets the singleton instance
	 * @return {Orders}
	 */
	
	static getInstance() {
		
		// Create the instance if needed
		typeof Orders.instance === 'undefined' && (Orders.instance = new Orders(config));
		
		// (:
		return Orders.instance;
		
	}
	
	/**
	 * Creates a new cart
	 * @param {string|number} user
	 * @param {CartType}      cart
	 * @return {Order|boolean}
	 */
	
	async create(user: number | String | undefined, cart: CartType): Promise<ValidationResults | Order | boolean> {
		
		// Validate the cart
		const validation: ValidationResults = this.validateCart(cart);
		
		// If any error ocurred
		if(validation.errors.length > 0) return validation;
		
		// New order to add
		const record: OrderType = { user : String(user), timestamp : Date.now(), products : cart.products, ...this.getCartTotals(cart) };
		
		// Sets the order
		const result = await this.insert(record);
		
		/// (:
		return result !== false ? new Order({ id : result, ...record }) : false;
		
	}
	
	/**
	 * Gets an order by id
	 * @param {number|String} id
	 * @return {Order|boolean}
	 */
	
	async get(id: String | number | undefined): Promise<Order | null> {
		
		// Gets the order
		return await super.get(id)
			.then((response: object) => response ? new Order(response as OrderType) : null)
		
	}
	
	/**
	 * Gets all records
	 * @param {String} field
	 * @param {*}      value
	 * @return {Array<Order>|boolean}
	 */
	
	async getAllBy(field: String, value: any): Promise<Array<Order>> {
		
		// Get all products
		return await super.getAllBy(field, value)
			.then((result: Array<OrderType>) => result ? result.map((order: OrderType) => new Order(order)) : []);
		
	}
	
	/**
	 * Gets the cart total amount and total products count
	 * @param {CartType} cart
	 * @return {OrderTotalsType}
	 */
	
	getCartTotals(cart: CartType): OrderTotalsType {
		
		// (:
		return cart.products.reduce((previous: OrderTotalsType, current: CartProduct) => {
			return {
				total : previous.total + (current?.price ? (current.amount * current.price) : 0),
				count : previous.count + current.amount
			} as OrderTotalsType;
		}, { total : 0, count : 0 } as OrderTotalsType)
		
	}
	
	/**
	 * Validates an order cart
	 * @param {CartType} data
	 * @return {ValidationResults}
	 */
	
	validateCart(data: CartType): ValidationResults {
		
		// (:
		return Validation.validate(data, [
			{
				field     : 'products',
				validator : (value: any): boolean => {
					return value.length > 0;
				},
				message   : 'El carro debe contener al menos un producto'
			}
		]);
		
	}
	
}

export default Orders;