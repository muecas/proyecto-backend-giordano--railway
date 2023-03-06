import { NextFunction, Request, RequestHandler, Response } from 'express';
import { JwtPayload, verify } from "jsonwebtoken";
import Users from "../../../services/Users/Users";
import User from "../../../services/Users/User";

declare module "jsonwebtoken" {
	export interface JwtPayload {
		id: number | string;
	}
}

/**
 * AuthMiddlewares class
 * @class
 */

class AuthMiddlewares {
	
	/**
	 * Is authenticated middleware
	 * @param {Request}  request
	 * @param {Function} success
	 * @param {Function} error
	 * @return {Function}
	 */
	
	static isAuthenticated(success: Function, error: Function): RequestHandler {
		return (request: Request, response: Response, next: NextFunction) => {
			if(request.isAuthenticated() === true) return success(request, response, next);
			else return error(request, response, next);
		};
	}
	
	/**
	 * Sesnd the non authorized header and response code
	 * @param {Request}  request
	 * @param {Response} response
	 */
	
	static missingToken(request: Request, response: Response) {
		response
			.setHeader('Content-Type', 'application/json; charset=UTF-8')
			.status(401)
			.json({
				errorCode : -1,
				error     : `${request.method}:${request.baseUrl}${request.url} no autorizado; verifique la cabezera de petición <authorization>`
			});
	}
	
	/**
	 * Verifies the token
	 * @param {Request}      request
	 * @param {Response}     response
	 * @param {NextFunction} next
	 */
	
	static isAuthenticatedRequest(request: Request, response: Response, next: NextFunction) {
		let auth: string | undefined = request.headers?.authorization;
		if(typeof auth === 'undefined') AuthMiddlewares.missingToken(request, response);
		else {
			auth = auth.split(' ')[1];
			verify(auth, String(process.env.JWT_SECRET), async (error, decoded) => {
				if(error) AuthMiddlewares.missingToken(request, response);
				else {
					const user: User | null = await Users.getInstance().get((decoded as JwtPayload)?.id).then(response => response);
					if(user !== null) {
						request.user = user;
						next();
					}
					else AuthMiddlewares.missingToken(request, response);
				}
			});
		}
	}
	
}

export default AuthMiddlewares;