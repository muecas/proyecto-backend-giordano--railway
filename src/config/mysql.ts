import { ConnectionConfig } from "./ConnectionConfig";

const options: ConnectionConfig = {
	client     : 'mysql',
	connection : {
		host     : process.env.DB_HOST     || 'localhost',
		port     : process.env.DB_PORT     || 3306,
		user     : process.env.DB_USER     || 'root',
		password : process.env.DB_PASSWORD || 'muecas78',
		database : process.env.DB_NAME     || 'coderhouse'
	}
}

export default options;