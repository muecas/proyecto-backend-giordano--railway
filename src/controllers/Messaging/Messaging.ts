import Messages from '../../services/Messages/Messages';
import Message from '../../services/Messages/Message';
import logger from "../../services/Logger/Logger";

// Container
const storage: Messages = Messages.getInstance();

/**
 * MessagingControllers class
 * @class
 */

class MessagingControllers {
	
	/**
	 * Gets all messages
	 */
	
	static async getAll() {
		return await storage
			.getAll()
			.then((messages: Array<Message>) => {
				return { messages : messages.map(message => message.toObject()) };
			})
			.catch(err => {
				logger.log('error', `Ocurrió un error al intentar cargar los mensajes: ${err}`);
				return { error : 'Ocurrió un error al intentar cargar los mensajes' };
			});
	}
	
}

export default MessagingControllers;