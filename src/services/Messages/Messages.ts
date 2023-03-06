import { Container } from "../../data-access/data-access";
import { ConnectionConfig } from "../../config/ConnectionConfig";
import Message, { MessageType } from "./Message";
import { config } from '../../data-access/data-access';
import Validation, { ValidationResults } from "../../utils/Validation/Validation";

/**
 * Messages class
 * @class
 */

class Messages extends Container {
	
	readonly aggregationFields: object = {
		$project : {
			_id       : 0,
			id        : '$_id',
			email     : 1,
			avatar    : 1,
			message   : 1,
			timestamp : 1
		}
	};
	static instance: Messages;
	
	/**
	 * Constructor
	 * @param {ConnectionConfig} config
	 */
	
	private constructor(config: ConnectionConfig) {
		
		// Super constructor
		super(config, 'messages');
		
	}
	
	/**
	 * Gets the singleton instance
	 * @return {Messages}
	 */
	
	static getInstance() {
		
		// Create the instance if needed
		typeof Messages.instance === 'undefined' && (Messages.instance = new Messages(config));
		
		// (:
		return Messages.instance;
		
	}
	
	/**
	 * Creates a new message
	 * @param {MessageType} message
	 * @return {Message|ValidationResult|boolean}
	 */
	
	async create(message: MessageType): Promise<ValidationResults | Message | boolean> {
		
		// Validate the product
		const validation: ValidationResults = this.validateProduct(message);
		
		// If any error ocurred
		if(validation.errors.length > 0) return validation;
		
		// Sets the message timestamp
		message.timestamp = Date.now();
		
		// Sets the cart
		const result = await this.insert(message);
		
		/// (:
		return result !== false ? new Message({ id : result, ...message }) : false;
		
	}
	
	/**
	 * Gets all records
	 * @return {Array<Message>|boolean}
	 */
	
	async getAll(): Promise<Array<Message>> {
		
		// Get all products
		return await super.getAll()
			.then((result: Array<MessageType>) => result ? result.map((message: MessageType) => new Message(message)) : []);
		
	}
	
	/**
	 * Validates a message
	 * @param {MesageType} message
	 * @return {ValidationResults}
	 */
	
	validateProduct(data: MessageType): ValidationResults {
		
		// (:
		return Validation.validate(data, [
			{
				field     : 'email',
				validator : (value: any): boolean => {
					return /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
				},
				message   : 'El campo <email> es obligatorio y debe ser del tipo email'
			},
			{
				field     : 'avatar',
				validator : (value: any): boolean => {
					return !!/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/.test(value);
				},
				message   : 'El campo <avatar> es obligatorio y debe ser del tipo url'
			},
			{
				field     : 'message',
				validator : (value: any): boolean => {
					return value !== null && value !== '';
				},
				message   : 'El campo <message> es obligatorio'
			}
		]);
		
	}
	
}

export default Messages;