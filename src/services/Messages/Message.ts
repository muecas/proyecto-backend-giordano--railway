import { PathLike } from "fs";

// Message type
type MessageType = {
	[key: string]: string | number | PathLike | undefined,
	id?: string | number | undefined,
	email?: string | undefined,
	avatar?: PathLike | undefined,
	message?: string | undefined,
	timestamp?: number | undefined,
};

class Message {
	
	private id: string | number | undefined;
	private email: string | undefined;
	private avatar: PathLike | undefined;
	private message: string | undefined;
	private timestamp: number | undefined;
	
	/**
	 * Message constructor
	 * @param {String|number|undefined} id
	 * @param {string|undefined}        email
	 * @param {PathLike|undefined}      avatar
	 * @param {string|undefined}        message
	 * @param {number|undefined}        timestamp
	 */
	
	constructor({ id, email, avatar, message, timestamp }: MessageType) {
		this.id = id;
		this.email = email;
		this.avatar = avatar;
		this.message = message;
		this.timestamp = timestamp;
	}
	
	/**
	 * Returns as object
	 * @param {boolean} id
	 * @return {MessageType}
	 */
	
	toObject(id: boolean = true): MessageType {
		
		// Sets the returning object
		const object: MessageType = {
			email     : this.email,
			avatar    : this.avatar,
			message   : this.message,
			timestamp : this.timestamp,
		};
		
		// Include id if needed
		id === true && (object.id = this.id);
		
		// (:
		return object;
		
	}
	
}

export { MessageType };
export default Message;