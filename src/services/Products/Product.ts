import { PathLike } from "fs";

// Products type
type ProductType = {
	[key: string]: number | String | PathLike | undefined,
	id?: number | String | undefined,
	name?: String | undefined,
	price?: number | undefined,
	thumbnail?: PathLike | undefined
};

class Product {
	
	private id: String | number | undefined;
	private name: String | undefined;
	private price: number | undefined;
	private thumbnail: PathLike | undefined;
	
	/**
	 * Product constructor
	 * @param {String|number|undefined} id
	 * @param {String|undefined}        name
	 * @param {number|undefined}        price
	 * @param {PathLike|undefined}      thumbnail
	 */
	
	constructor({ id, name, price, thumbnail }: ProductType) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.thumbnail = thumbnail;
	}
	
	/**
	 * Gets the product id
	 * @return {String|number|undefined}
	 */
	
	getId(): String | number | undefined {
		return this.id;
	}
	
	/**
	 * Returns as object
	 * @param {boolean} id
	 * @return {ProductType}
	 */
	
	toObject(id: boolean = true): ProductType {
		
		// Sets the returning object
		const object: ProductType = {
			name      : this.name,
			price     : this.price,
			thumbnail : this.thumbnail
		};
		
		// Include id if needed
		id === true && (object.id = this.id);
		
		// (:
		return object;
		
	}
	
}

export { ProductType };
export default Product;