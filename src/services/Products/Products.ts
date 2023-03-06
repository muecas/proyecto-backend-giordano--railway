import { config, Container } from "../../data-access/data-access";
import { ConnectionConfig } from "../../config/ConnectionConfig";
import Product, { ProductType } from "./Product";
import Validation, { ValidationResult, ValidationResults } from "../../utils/Validation/Validation";

/**
 * Products class
 * @class
 */

class Products extends Container {
	
	readonly aggregationFields: object = {
		$project : {
			_id       : 0,
			id        : '$_id',
			name      : 1,
			price     : 1,
			thumbnail : 1
		}
	};
	static instance: Products;
	
	/**
	 * Constructor
	 * @param {ConnectionConfig} config
	 */
	
	private constructor(config: ConnectionConfig) {
		
		// Super constructor
		super(config, 'products');
		
	}
	
	/**
	 * Gets the singleton instance
	 * @return {Products}
	 */
	
	static getInstance() {
		
		// Create the instance if needed
		typeof Products.instance === 'undefined' && (Products.instance = new Products(config));
		
		// (:
		return Products.instance;
		
	}
	
	/**
	 * Saves a new product to the products storage
	 * @param {ProductType} product
	 * @return {Product|ValidationResult|boolean}
	 */
	
	async create(product: ProductType): Promise<ValidationResults | Product | boolean> {
		
		// Validate the product
		const validation: ValidationResults = this.validateProduct(product);
		
		// If any error ocurred
		if(validation.errors.length > 0) return validation;
		
		// Sets the product
		const result = await this.insert(product);
		
		// (:
		return result !== false ? new Product({ id : result, ...product }) : false;
		
	}
	
	/**
	 * Updates a product
	 * @param {number|String} id
	 * @param {ProductType}   product
	 * @return {Product|ValidationResult|false}
	 */
	
	async edit(id: any, product: ProductType): Promise<Product | ValidationResults | boolean | null> {
		
		// Gets the product by id
		const record: Product | null = await this.get(id);
		
		// ):
		if(record === null) return null;
		
		// Validates the product
		const validation: ValidationResults = this.validateProduct(product);
		
		// If any error ocurred
		if(validation.valid.length === 0) return validation;
		
		// Sets the fields to update
		const update: ProductType = {};
		
		// Gets the fields to update
		validation.valid.map((valid: ValidationResult) => {
			update[String(valid.field)] = product[String(valid.field)];
		});
		
		// Updates the product
		const result = await super.update(id, { ...update });
		
		// (:
		return result === true ? new Product({ id, ...record.toObject(), ...update }) : false;
		
	}
	
	/**
	 * Deletes a product
	 * @param {number|String} id
	 * @return {boolean|null}
	 */
	
	async remove(id: any): Promise<boolean | null> {
		
		// Gets the product index
		const record: Product | null = await this.get(id);
		
		// ):
		if(record === null) return null;
		
		// (:
		return await super.delete(id);
		
	}
	
	/**
	 * Gets a product by id
	 * @param {number|String} id
	 * @return {Product|boolean}
	 */
	
	async get(id: String | number | undefined): Promise<Product | null> {
		
		// Gets the product
		return await super.get(id)
			.then((response: object) => response ? new Product(response as ProductType) : null)
		
	}
	
	/**
	 * Gets all records
	 * @return {Array<Product>|boolean}
	 */
	
	async getAll(): Promise<Array<Product>> {
		
		// Get all products
		return await super.getAll()
			.then((result: Array<ProductType>) => result ? result.map((product: ProductType) => new Product(product)) : []);
		
	}
	
	/**
	 * Validates a product
	 * @param {ProductType} date
	 * @return {ValidationResults}
	 */
	
	validateProduct(data: ProductType): ValidationResults {
		
		// (:
		return Validation.validate(data, [
			{
				field     : 'name',
				validator : (value: any): boolean => {
					return value !== null && value !== '';
				},
				message   : 'El campo <name> es obligatorio'
			},
			{
				field     : 'price',
				validator : (value: any): boolean => {
					return !isNaN(parseInt(value)) && Number(value) >= 0;
				},
				message   : 'El campo <price> es obligatorio y debe ser un valor numérico'
			},
			{
				field     : 'thumbnail',
				validator : (value: any): boolean => {
					return /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(value);
				},
				message   : 'El campo <thumbnail> es obligatorio y debe ser del tipo url'
			}
		]);
		
	}
	
}

export default Products;