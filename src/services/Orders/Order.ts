import { CartProduct } from "../Carts/Cart";

// Order totals type
type OrderTotalsType = {
	[key: string]: number,
	total: number,
	count: number
}

// Order type
type OrderType = {
	[key: string]: string | number | Array<CartProduct> | undefined,
	id?: string | number | undefined,
	timestamp?: number | undefined,
	user?: string | number | undefined,
	products?: Array<CartProduct>,
	total?: number | undefined,
	count?: number | undefined
};

class Order {
	
	private id: string | number | undefined;
	private user: string | number | undefined;
	private timestamp: number | undefined;
	private products: Array<CartProduct> = [];
	private total: number | undefined;
	private count: number | undefined;
	
	/**
	 * Cart constructor
	 * @param {String|number|undefined} id
	 * @param {string|number|undefined} user
	 * @param {number|undefined}        timestamp
	 * @param {Array<Product>}          products
	 * @param {number|undefined}        total
	 * @param {number|undefined}        count
	 */
	
	constructor({ id, user, timestamp, products, total, count }: OrderType) {
		this.id = id;
		this.user = user;
		this.timestamp = timestamp;
		this.products = products || [];
		this.total = total;
		this.count = count;
	}
	
	/**
	 * Returns as object
	 * @param {boolean} id
	 * @return {OrderType}
	 */
	
	toObject(id: boolean = true): OrderType {
		
		// Sets the returning object
		const object: OrderType = {
			user      : this.user,
			timestamp : this.timestamp,
			products  : this.products,
			total     : this.total,
			count     : this.count
		};
		
		// Include id if needed
		id === true && (object.id = this.id);
		
		// (:
		return object;
		
	}
	
}

export { OrderType, OrderTotalsType };
export default Order;