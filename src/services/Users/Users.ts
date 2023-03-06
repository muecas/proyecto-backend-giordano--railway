import { config, Container } from "../../data-access/data-access";
import { ConnectionConfig } from "../../config/ConnectionConfig";
import User, { UserType } from "./User";
import Validation, { ValidationResult, ValidationResults } from "../../utils/Validation/Validation";

/**
 * Users class
 * @class
 */

class Users extends Container {
	
	readonly aggregationFields: object = {
		$project : {
			_id       : 0,
			id        : '$_id',
			name      : 1,
			email     : 1,
			password  : 1
		}
	};
	static instance: Users;
	
	/**
	 * Constructor
	 * @param {ConnectionConfig} config
	 */
	
	private constructor(config: ConnectionConfig) {
		
		// Super constructor
		super(config, 'users');
		
	}
	
	/**
	 * Gets the singleton instance
	 * @return {Users}
	 */
	
	static getInstance() {
		
		// Create the instance if needed
		typeof Users.instance === 'undefined' && (Users.instance = new Users(config));
		
		// (:
		return Users.instance;
		
	}
	
	/**
	 * Saves a new user to the users storage
	 * @param {UserType} user
	 * @return {User|ValidationResult|boolean}
	 */
	
	async create(user: UserType): Promise<ValidationResults | User | boolean> {
		
		// Validate the product
		const validation: ValidationResults = this.validateProduct(user);
		
		// If any error ocurred
		if(validation.errors.length > 0) return validation;
		
		// Sets the product
		const result = await this.insert(user);
		
		// (:
		return result !== false ? new User({ id : result, ...user }) : false;
		
	}
	
	/**
	 * Updates a user
	 * @param {number|String} id
	 * @param {UserType}      user
	 * @return {User|ValidationResult|false}
	 */
	
	async edit(id: any, user: UserType): Promise<User | ValidationResults | boolean | null> {
		
		// Gets the user by id
		const record: User | null = await this.get(id);
		
		// ):
		if(record === null) return null;
		
		// Validates the user
		const validation: ValidationResults = this.validateProduct(user);
		
		// If any error ocurred
		if(validation.valid.length === 0) return validation;
		
		// Sets the fields to update
		const update: UserType = {};
		
		// Gets the fields to update
		validation.valid.map((valid: ValidationResult) => {
			update[String(valid.field)] = user[String(valid.field)];
		});
		
		// Updates the user
		const result = await super.update(id, { ...update });
		
		// (:
		return result === true ? new User({ id, ...record.toObject(false, true), ...update }) : false;
		
	}
	
	/**
	 * Deletes a user
	 * @param {number|String} id
	 * @return {boolean|null}
	 */
	
	async remove(id: any): Promise<boolean | null> {
		
		// Gets the product index
		const record: User | null = await this.get(id);
		
		// ):
		if(record === null) return null;
		
		// (:
		return await super.delete(id);
		
	}
	
	/**
	 * Gets a user by id
	 * @param {number|String} id
	 * @return {User|boolean}
	 */
	
	async get(id: String | number | undefined): Promise<User | null> {
		
		// Gets the product
		return await super.get(id)
			.then((response: object) => response ? new User(response as UserType) : null)
		
	}
	
	/**
	 * Gets a user by any field
	 * @param {String} field
	 * @param {*}      value
	 * @return {User|boolean}
	 */
	
	async getBy(field: String, value: any): Promise<User | null> {
		
		// Gets the product
		return await super.getBy(field, value)
			.then((response: object) => response ? new User(response as UserType) : null)
		
	}
	
	/**
	 * Validates a user
	 * @param {UserType} date
	 * @return {ValidationResults}
	 */
	
	validateProduct(data: UserType): ValidationResults {
		
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
				field     : 'email',
				validator : (value: any): boolean => {
					return /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
				},
				message   : 'El campo <email> es obligatorio y debe ser del tipo email'
			},
			{
				field     : 'password',
				validator : (value: any): boolean => {
					return value !== null && value !== '';
				},
				message   : 'El campo <password> es obligatorio'
			}
		]);
		
	}
	
}

export default Users;