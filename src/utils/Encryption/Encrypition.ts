import * as bcrypt from 'bcrypt';

/**
 * Encrypition class
 * @class
 */

class Encrypition {
	
	/**
	 * Compare two strings
	 * @param {*} str1
	 * @param {*} str2
	 * @return {boolean}
	 */
	
	static compare(str1: any, str2: any): boolean {
		return bcrypt.compareSync(str1, str2);
	}
	
	/**
	 * Encrypts a string
	 * @param {*} str
	 * @return {String}
	 */
	
	static create(str: any): String {
		return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
	}
	
}

export default Encrypition;