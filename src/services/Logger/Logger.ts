import * as winston from 'winston';
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";

// Transports definition
const transports: Array<FileTransportInstance | ConsoleTransportInstance> = [
	new winston.transports.File({ filename : 'logs/warn.log', level : 'warn' }),
	new winston.transports.File({ filename : 'logs/error.log', level : 'error' }),
];

// Console transport for development instances
if(process.env.NODE_ENV !== 'production') transports.push(new winston.transports.Console());

// Initializes the logger
const logger = winston.createLogger({
	level : process.env.LOG_LEVEL || 'info',
	transports
});

export default logger;