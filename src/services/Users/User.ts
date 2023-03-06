// Users type
type UserType = {
	[key: string]: number | String | undefined,
	id?: number | String | undefined,
	name?: String | undefined,
	email?: String | undefined,
	password?: String | undefined
};

class User {
	
	private id: String | number | undefined;
	private name: String | undefined;
	private email: String | undefined;
	private password: String | undefined;
	
	/**
	 * User constructor
	 * @param {String|number|undefined} id
	 * @param {String|undefined}        name
	 * @param {String|undefined}        email
	 * @param {String|undefined}        password
	 */
	
	constructor({ id, name, email, password }: UserType) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	/**
	 * Gets the user id
	 * @return {String|number|undefined}
	 */
	
	getId(): String | number | undefined {
		return this.id;
	}
	
	/**
	 * Returns as object
	 * @param {boolean} id
	 * @return {UserType}
	 */
	
	toObject(id: boolean = true, password: boolean = false): UserType {
		
		// Sets the returning object
		const object: UserType = {
			name     : this.name,
			email    : this.email,
		};
		
		// Include id and password if needed
		id === true && (object.id = this.id);
		password === true && (object.password = this.password);
		
		// (:
		return object;
		
	}
	
}

export { UserType };
export default User;