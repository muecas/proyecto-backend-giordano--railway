import { sign } from 'jsonwebtoken';

/**
 * Auth class
 * @class
 */

class Auth {
	
	private static DEFAULT_JWT_SECRET: string = 'epT4HtsxFmttafxYa4KmFcjt';
	
	/**
	 * Generates the json web token
	 * @param {Object} data
	 */
	
	static generateToken(data: object): string {
		return sign(data, String(process.env.JWT_SECRET || Auth.DEFAULT_JWT_SECRET));
	}
	
}

export default Auth;