import knex, { Knex as KnexNamespace } from 'knex';
import CreateTableBuilder = KnexNamespace.CreateTableBuilder;
import { ConnectionConfig } from "../../config/ConnectionConfig";

/**
 * Knex data access class
 * @class
 */

class Knex {
	
	readonly tableName: string;
	readonly connection;
	
	/**
	 * Constructor
	 * @param {ConnectionConfig} config
	 * @param {String}           tableName
	 */
	
	constructor(config: ConnectionConfig | object, tableName: string) {
		
		// Sets the table name
		this.tableName = tableName;
		
		// Creates the connection
		this.connection = knex(<object> config);
		
	}
	
	/**
	 * Creates the record
	 * @param {Object} data
	 * @return {Promise<boolean>}
	 */
	
	async insert(data: Object): Promise<any | boolean> {
		
		// (:
		return await
			this.connection(this.tableName)
				.insert(data, 'id')
				.then((id) => id[0])
				.catch(err => {
					return false;
				});
		
	}
	
	/**
	 * Updated the record
	 * @param {*}      id
	 * @param {Object} data
	 * @return {Promise<boolean>}
	 */
	
	async update(id: any, data: object): Promise<boolean> {
		
		// (:
		return await
			this.connection(this.tableName)
				.where({ id })
				.update(data)
				.then(() => true)
				.catch(err => {
					return false;
				});
		
	}
	
	/**
	 * Deletes the record
	 * @param {*} id
	 * @return {Promise<boolean>}
	 */
	
	async delete(id: any): Promise<boolean> {
		
		// (:
		return await
			this.connection(this.tableName)
				.where({ id })
				.delete()
				.then(() => true)
				.catch(err => {
					return false;
				});
		
	}
	
	/**
	 * Gets a record by id
	 * @param {*} id
	 * @return {object|boolean}
	 */
	
	async get(id: any): Promise<object | null> {
		
		// Gets the matched product by id
		const result = await this.connection
			.from(this.tableName)
			.where({ id })
			.limit(1)
			.then((records) => records)
			.catch(err => {
				return null;
			});
		
		// (:
		return result !== null && result.length > 0 ? result[0] : null;
		
	}
	
	/**
	 * Gets a record by any field
	 * @param {string} field
	 * @param {*}      value
	 * @return {object|boolean}
	 */
	
	async getBy(field: string, value: any): Promise<object | null> {
		
		// Gets the matched records by any field
		const result = await this.connection
			.from(this.tableName)
			.where({ [field] : value })
			.limit(1)
			.then((records) => records)
			.catch(err => {
				return null;
			});
		
		// (:
		return result !== null && result.length > 0 ? result[0] : null;
		
	}
	
	/**
	 * Gets all record by any field
	 * @param {string} field
	 * @param {*}      value
	 * @return {object|boolean}
	 */
	
	async getAllBy(field: string, value: any): Promise<object | null> {
		
		// Gets the matched records by any field
		const result = await this.connection
			.from(this.tableName)
			.where({ [field] : value })
			.then((records) => records)
			.catch(err => {
				return null;
			});
		
		// (:
		return result !== null && result.length > 0 ? result : null;
		
	}
	
	/**
	 * Gets all records
	 * @return {Array|boolean}
	 */
	
	async getAll(): Promise<Array<object> | boolean> {
		
		// (:
		return await this.connection
			.from(this.tableName)
			.select('*')
			.then((records: Array<any>) => records)
			.catch(err => {
				return false;
			})
		
	}
	
}

export default Knex;