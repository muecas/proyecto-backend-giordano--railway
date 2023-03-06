import { Request, Response } from 'express';
import Users from '../../services/Users/Users';
import User from '../../services/Users/User';
import { sign } from 'jsonwebtoken';
import Encrypition from "../../utils/Encryption/Encrypition";
import logger from "../../services/Logger/Logger";
import Auth from "../../services/Auth/Auth";

// Container
const storage: Users = Users.getInstance();

/**
 * AuthControllers class
 * @class
 */

class AuthControllers {
	
	/**
	 * Login
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static login(request: Request, response: Response) {
		response.render('login', { error : request.query.hasOwnProperty('error') ? true : false });
	}
	
	/**
	 * Signup
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static signup(request: Request, response: Response) {
		response.render('signup', { error : request.query.hasOwnProperty('error') ? true : false });
	}
	
	/**
	 * Logout
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static logout(request: Request, response: Response) {
		request.logout(err => {});
		response.redirect('/login');
	}
	
	/**
	 * Logout
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static userProfile(request: Request, response: Response) {
		const token = Auth.generateToken({ id : (request.user as User).toObject().id });
		return response.render('user-profile', { token, ...request.user });
	}
	
	/**
	 * Sesnd the auth failure header and response code
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static notAuthhorized(request: Request, response: Response) {
		response
			.setHeader('Content-Type', 'application/json; charset=UTF-8')
			.status(401)
			.json({
				errorCode : -1,
				error     : `Credenciales incorrectas`
			});
	}
	
	/**
	 * Auth
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static async auth(request: Request, response: Response) {
		const email: string | undefined = request.body?.email;
		const password: string | undefined = request.body?.password;
		if(email && password) {
			await storage.getBy('email', email)
				.then(result => {
					if(result === null || Encrypition.compare(String(password), result.toObject(false, true).password) === false) {
						logger.log('warn', `Intento de autorización de usuario por API fallido (email: ${email}`);
						AuthControllers.notAuthhorized(request, response);
					} else {
						logger.log('info', `Autorización de usuario por API exitoso (email: ${email}`);
						const token = Auth.generateToken({ id : result.toObject().id });
						request.user = result;
						response
							.setHeader('Content-Type', 'application/json; charset=UTF-8')
							.status(200)
							.json({ token });
					}
				})
				.catch(err => {
					logger.log('error', `Ocurrió un error al intentar cargar el usuario: ${err}`);
					response.json({
						error : 'Ocurrió un error al intentar cargar el usuario',
					});
				});
		} else AuthControllers.notAuthhorized(request, response);
	}
	
}
export default AuthControllers;