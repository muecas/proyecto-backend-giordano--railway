import { ProductType } from "../Products/Product";

// Cart products type
type CartProduct = ProductType & {
	amount: number
};

// Cart type
type CartType = {
	[key: string]: string | number | Array<CartProduct> | undefined,
	id?: string | number | undefined,
	timestamp?: number | undefined,
	products: Array<CartProduct>
};

class Cart {
	
	private id: string | number | undefined;
	private timestamp: number | undefined;
	private products: Array<CartProduct> = [];
	
	/**
	 * Cart constructor
	 * @param {String|number|undefined} id
	 * @param {number|undefined}        timestamp
	 * @param {Array<Product>}          products
	 */
	
	constructor({ id, timestamp, products }: CartType) {
		this.id = id;
		this.timestamp = timestamp;
		this.products = products;
	}
	
	/**
	 * Set the cart products
	 * @param {Array<CartProduct>} products
	 */
	
	setProducts(products: Array<CartProduct>): void {
		this.products = products;
	}
	
	/**
	 * Get the cart products
	 * @return {Array<CartProduct>}
	 */
	
	getProducts(): Array<CartProduct> {
		return this.products;
	}
	
	/**
	 * Returns as object
	 * @param {boolean} id
	 * @return {CartType}
	 */
	
	toObject(id: boolean = true): CartType {
		
		// Sets the returning object
		const object: CartType = {
			timestamp : this.timestamp,
			products  : this.products
		};
		
		// Include id if needed
		id === true && (object.id = this.id);
		
		// (:
		return object;
		
	}
	
}

export { CartType, CartProduct };
export default Cart;