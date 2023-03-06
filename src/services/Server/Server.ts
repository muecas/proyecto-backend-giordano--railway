import express = require('express');
import http = require('http');
import { Express, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import { AddressInfo } from 'net';
import products from '../../routes/Products/Products';
import carts from '../../routes/Carts/Carts';
import messaging from '../../routes/Messaging/Messaging';
import auth from '../../routes/Auth/Auth';
import orders from '../../routes/Orders/Orders';
import MessagingControllers from "../../controllers/Messaging/Messaging";
import compression = require('compression');
import logger from "../Logger/Logger";
import * as os from "os";
import { ServerOptions, SessionType } from "../../../types/Server";
import Messages from "../Messages/Messages";
import session = require('express-session');
import SessionFileStore = require('session-file-store');
import MongoStore = require("connect-mongo");
import passport = require('passport');

/**
 * Server class
 * @class
 */

class Server {
	
	static readonly DEFAULT_PORT: number = 8080;
	
	static readonly DEFAULT_STATIC_PATH: string = `${process.cwd()}/public`;
	static readonly DEFAULT_VIEWS_PATH: string = `${process.cwd()}/views`;
	
	static readonly DEFAULT_SESSION_TYPE: SessionType = 'FILE_STORE';
	static readonly DEFAULT_SESSION_SECRET_KEY: string = '3utc64ueKwXyuNyvEUmKh7uq';
	static readonly DEFAULT_SESSION_TTL: number = 60 * 60 * 24 * 7;
	static readonly DEFAULT_SESSION_STORAGE_PATH: string = `${process.cwd()}/session-storage`;
	static readonly DEFAULT_SESSION_COOKIE_MAXAGE: number = 60 * 60 * 24;
	static readonly DEFAULT_SESSION_MONGO_URL: string = 'mongodb://localhost:27017/ecommerce';
	
	private readonly port: number;
	private readonly app: Express;
	private readonly server: HttpServer;
	private readonly io: IOServer;
	private readonly messages: Messages;
	
	/**
	 * Server constructor
	 * @param {ServerOptions} options
	 */
	
	constructor(options?: ServerOptions) {
		
		// Log
		logger.log('info', 'Inicializando servidor');
		
		// Sets the port
		this.port = Number(options?.port || Server.DEFAULT_PORT);
		
		// Messaging instance
		this.messages = Messages.getInstance();
		
		// Creates the server
		this.app    = express();
		this.server = http.createServer(this.app);
		this.io     = new IOServer(this.server);
		
		// Extras
		this.app.use(express.urlencoded({ extended : true }));
		this.app.use(express.json());
		this.app.use(express.static(options?.public || Server.DEFAULT_STATIC_PATH));
		
		// Handlebars template engine
		this.app.engine('handlebars', engine({ defaultLayout : 'main' }));
		this.app.set('view engine', 'handlebars');
		this.app.set('views', options?.views || Server.DEFAULT_VIEWS_PATH);
		
		// Log
		logger.log('info', `Utilizando sesión en ${options?.session?.type === 'MONGO_STORE' || Server.DEFAULT_SESSION_TYPE === 'MONGO_STORE' ? 'Mongo' : 'sistema de archivos'}`);
		
		// Session type definition
		const sessionOptions: Object = options?.session?.type === 'MONGO_STORE' || Server.DEFAULT_SESSION_TYPE === 'MONGO_STORE' ?
			{
				store : MongoStore.create({
					mongoUrl : String(options?.session?.mongoUrl) || Server.DEFAULT_SESSION_MONGO_URL
				})
			} :
			{
				store : new (SessionFileStore(session))({
					path    : options?.session?.path || Server.DEFAULT_SESSION_STORAGE_PATH,
					ttl     : options?.session?.ttl || Server.DEFAULT_SESSION_TTL,
					retries : 0
				})
			};
		
		// Session configuration
		this.app.use(session({
			rolling           : true,
			resave            : true,
			saveUninitialized : false,
			secret            : options?.session?.secret || Server.DEFAULT_SESSION_SECRET_KEY,
			cookie            : {
				maxAge   : options?.session?.cookieMaxAge || Server.DEFAULT_SESSION_COOKIE_MAXAGE,
				secure   : false,
				httpOnly : false
			},
			...sessionOptions
		}));
		
		// Responses should use compression
		if(options?.gzip === true) {
 		
			// Log
			logger.log('info', 'Usando compresión gzip');
			
			// Use compression
			this.app.use(compression());
			
		}
		
		// Passport
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		
		// Endpoints
		this.app.use('/api/products', products);
		this.app.use('/api/carts', carts);
		this.app.use('/api/orders', orders);
		this.app.use('/chat', messaging);
		this.app.use(auth);
		
		// Extra endpints (catch all, information, and so)
		this.app
			.get('/info', (request: Request, response: Response) => {
				response.render('info', {
					platform  : process.platform,
					argv      : JSON.stringify(options?.argv || {}),
					execPath  : process.execPath,
					pid       : process.pid,
					memory    : process.memoryUsage.rss(),
					version   : process.version,
					cpus      : os.cpus().length,
				});
			})
			.all('/api(/:called)?', (request: Request, response: Response) => {
				logger.log('warn', `Ruta de API no implementada: ${request.originalUrl}`);
				response.status(404);
				response.json({
					errorCode : -2,
					error     : `${request.method}:${request.baseUrl}${request.url} no implementado`
				});
			})
			.all('*', (request: Request, response: Response) => {
				logger.log('warn', `Ruta no encontrada: ${request.originalUrl}`);
				response.status(404).render('error-404');
			});
		
	}
	
	/**
	 * Gets the app instance
	 * @return {Express}
	 */
	
	getApp(): Express {
		
		// (:
		return this.app;
		
	}
	
	/**
	 * Starts the server
	 */
	
	start(): void {
		
		// Listener
		this.server.listen(this.port, () => {
			const { port } = this.server.address() as AddressInfo;
			logger.log('info', `Proceso corriendo en puerto ${port} (PID: ${process.pid})`);
		});
		
		// IO Server
		this.io
			.on('connection', async (socket: Socket) => {
				logger.log('info', `Cliente conectado (ID: ${socket.id})`);
				const result = await MessagingControllers.getAll();
				socket.emit('messages', result);
				socket.on('message', async ({ email, avatar, message }) => {
					await this.messages.create({ email, avatar, message });
					this.messages.getAll().then(result => this.io.sockets.emit('messages', { messages : result }));
				});
			});
		
		// Error handler
		this.server.on('error', (err: string) => {
			logger.log('error', `Ocurrió un error ${err}.`);
		});
		
	}
	
}

export default Server;