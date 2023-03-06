import { CLIArgs } from "./yargs";

// Definitions
type MongoStoreType = 'MONGO_STORE';
type FileStoreType = 'FILE_STORE';

// Session type
type SessionType = MongoStoreType | FileStoreType;

// Server type options
type SessionOptions = {
	[key: string]: number | string | SessionType | undefined,
	type?: SessionType,
	secret?: string | undefined,
	ttl?: number | undefined
	path?: string | undefined,
	cookieMaxAge?: number | undefined
};

// Server type options
type ServerOptions = {
	[key: string]: number | string | boolean | CLIArgs | SessionOptions | undefined,
	port : number | string,
	gzip?: boolean | undefined,
	argv?: CLIArgs | undefined,
	public?: string | undefined,
	views?: string | undefined,
	session?: SessionOptions | undefined
};

export { ServerOptions, SessionOptions, SessionType, MongoStoreType, FileStoreType };

