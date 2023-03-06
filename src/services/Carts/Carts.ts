import { Container } from "../../data-access/data-access";
import Products from "../Products/Products";
import Product from "../Products/Product";
import { ConnectionConfig } from "../../config/ConnectionConfig";
import Cart, { CartType, CartProduct } from "./Cart";
import { config } from '../../data-access/data-access';

/**
 * Carts class
 * @class
 */

class Carts extends Container {
	
	private readonly products: Products;
	readonly aggregationFields: object = {
		$project : {
			_id       : 0,
			id        : '$_id',
			timestamp : 1,
			products  : 1
		}
	};
	static instance: Carts;
	
	/**
	 * Constructor
	 * @param {ConnectionConfig} config
	 */
	
	private constructor(config: ConnectionConfig) {
		
		// Super constructor
		super(config, 'carts');
		
		// Initializes the products instance
		this.products = Products.getInstance();
		
	}
	
	/**
	 * Gets the singleton instance
	 * @return {Carts}
	 */
	
	static getInstance() {
		
		// Create the instance if needed
		typeof Carts.instance === 'undefined' && (Carts.instance = new Carts(config));
		
		// (:
		return Carts.instance;
		
	}
	
	/**
	 * Creates a new cart
	 * @return {Cart|boolean}
	 */
	
	async create(): Promise<Cart | boolean> {
		
		// New cart to add
		const record: CartType = { timestamp : Date.now(), products : [] };
		
		// Sets the cart
		const result = await this.insert(record);
		
		/// (:
		return result !== false ? new Cart({ id : result, ...record }) : false;
		
	}
	
	/**
	 * Add products to existing cart or creates a new one
	 * @param {number|String}  id
	 * @param {Array<Product>} products
	 * @return {Cart|null}
	 */
	
	async addToCart(id: any, products: Array<CartProduct>): Promise<Cart | null | boolean> {
		
		// Gets the cart by id
		const record: Cart | null = await this.get(id);
		
		// ):
		if(record === null) return null;
		
		// Filtered products
		let filteredProducts: Array<CartProduct> = [];
		
		// While index
		let index = 0;
		
		// While there are any products to check
		while(index < products.length) {
			
			// Gets the product by id
			const product = await this.products.get(products[index].id).then(result => result);
			
			// If the products exists
			if(product !== null) {
				
				// Check if the product already exists in the cart
				const productIndex = (record as Cart).getProducts().findIndex(({ id }) => String(id) === String((product as Product).getId()));
				
				// If the product already exists in the cart
				if(productIndex >= 0) {
					
					// Sets the new product amount
					(record as Cart).getProducts()[productIndex].amount += products[index].amount;
					
				} else {
					
					// Pushes the product to the new products array
					filteredProducts.push({ ...product, amount: products[index]?.amount || 1 });
					
				}
				
			}
			
			// Next!
			index = index + 1;
			
		}
		
		// If there are any new products to add
		if(filteredProducts.length > 0) {
			
			// Sets the record
			filteredProducts = ([] as Array<CartProduct>).concat((record as Cart).getProducts(), filteredProducts);
			filteredProducts = filteredProducts.filter((value, index) => filteredProducts.indexOf(value) === index);
			
		}
		
		// Sets the cart
		record.setProducts(filteredProducts.length > 0 ? filteredProducts : (record as Cart).getProducts());
		
		// Stores the cart
		const result = await this.update(id, record.toObject(false))
		
		// (:
		return result !== false ? record : false;
		
	}
	
	/**
	 * Add products to existing cart or creates a new one
	 * @param {*} id
	 * @param {*} productId
	 * @return {Cart|boolean|null}
	 */
	
	async removeFromCart(id: any, productId: any): Promise<Cart | boolean | null> {
		
		// Gets the cart by id
		const record: Cart | null = await this.get(id);
		
		// ):
		if(record === null) return null;
		
		// Product index
		const productIndex = (record as Cart).getProducts().findIndex((product: CartProduct) => String(product.id) === String(productId));
		
		// If the product is in the cart
		if(productIndex >= 0) {
			
			// Removed the product from the cart
			(record as Cart).getProducts().splice(productIndex, 1);
			
			// Sets the cart
			await this.update(id, record.toObject(false));
			
			// (:
			return record;
			
		}
		
		// (:
		return record as Cart;
		
	}
	
	/**
	 * Creates the record
	 * @param {Object} data
	 * @return {Promise<boolean>}
	 */
	
	async insert(data: Object): Promise<any | boolean> {
		
		// (:
		return await super.insert(this.encode(data));
		
	}
	
	/**
	 * Updated the record
	 * @param {string|number} id
	 * @param {Object}        data
	 * @return {Promise<boolean>}
	 */
	
	async update(id: string | number, data: object): Promise<boolean> {
		
		// (:
		return await super.update(id, this.encode(data));
		
	}
	
	/**
	 * Encodes the data to store
	 * @param {object} data
	 * @return {object}
	 */
	
	encode(data: object): object {
		
		// Depending on the DB engine
		switch(process.env.DB_ENGINE) {
			
			// MySQL/SQLite3
			case 'mysql':
			case 'sqlite3':
				(data as { products: Array<Product> | string }).products = JSON.stringify((data as CartType).products);
				break;
			
		}
		
		// (:
		return data;
		
	}
	
	/**
	 * Decodes the data from storage
	 * @param {object} data
	 * @return {object}
	 */
	
	decode(data: object): object {
		
		// Depending on the DB engine
		switch(process.env.DB_ENGINE) {
			
			// MySQL/SQLite3
			case 'mysql':
			case 'sqlite3':
				if(data !== null) (data as { products: Array<Product> | string }).products = JSON.parse((data as { products: string }).products);
				break;
			
		}
		
		// (:
		return data;
		
	}
	
	/**
	 * Gets a cart by id
	 * @param {*} id
	 * @return {Cart|null}
	 */
	
	async get(id: string | number): Promise<Cart | null> {
		
		// Gets the product
		return await super.get(id)
			.then((response: object) => response ? new Cart(this.decode(response) as CartType) : null);
		
	}
	
	/**
	 * Deletes a product
	 * @param {*} id
	 * @return {boolean|null}
	 */
	
	async remove(id: string | number): Promise<boolean | null> {
		
		// Gets the product index
		const record: Cart | null = await this.get(id);
		
		// ):
		if(record === null) return null;
		
		// (:
		return await super.delete(id);
		
	}
	
}

export default Carts;