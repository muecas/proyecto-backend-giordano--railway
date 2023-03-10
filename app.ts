import { config } from 'dotenv';
import yargs = require("yargs");
import { hideBin } from "yargs/helpers";
import cluster from "cluster";
import * as os from "os";
import Server from './src/services/Server/Server';
import logger from "./src/services/Logger/Logger";
import { CLIArgs } from "./types/yargs";
import { SessionType } from "./types/Server";

// Initializes dotevn
config();

// Command line arguments
const argv : CLIArgs | Promise<CLIArgs> = yargs(hideBin(process.argv)).option({
	port : { type : 'number', default : process.env.PORT || Server.DEFAULT_PORT, alias : 'p' },
	mode : { type : 'string', default : process.env.MODE || 'fork', alias : 'm' },
	cpus : { type : 'number', default : process.env.CPUS || os.cpus().length, alias : 'c' },
	gzip : { type : 'boolean', default : process.env.GZIP ? Boolean(process.env.GZIP) : false, alias : 'g' },
}).argv as CLIArgs;

// Destructed constants
const { port, mode, cpus, gzip } = argv;

// If on primary process
if(mode === 'cluster' && cluster.isPrimary === true) {
	
	// Log
	logger.log('info', `Corriendo proceso principal (PID: ${process.pid}).`);
	
	// For each CPU, forks the process
	for(let x = 0, max = cpus; x < Math.min(max, os.cpus().length); x = x + 1) {
		cluster.fork();
	}
	
} else {
	
	// Creates the server
	const server: Server = new Server({
		port,
		gzip,
		argv,
		public  : `${__dirname}/public`,
		views   : `${__dirname}/views`,
		session : {
			type         : process.env.SESSION_TYPE as SessionType,
			secret       : process.env.SESSION_SECRET_KEY,
			ttl          : Number(process.env.SESSION_TTL),
			path         : `${__dirname}/session-storage`,
			cookieMaxAge : Number(process.env.SESSION_COOKIE_MAXAGE),
			mongoUrl     : `${process.env.DB_URI}${process.env.DB_NAME}`
		}
	});

	// Starts the server
	server.start();
	
}