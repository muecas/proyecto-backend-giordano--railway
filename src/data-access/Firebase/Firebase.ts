import initFirebase from '../../config/firebase';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, orderBy, addDoc, updateDoc, deleteDoc, writeBatch, increment, Firestore, limit } from 'firebase/firestore';
import { ConnectionConfig } from "../../config/ConnectionConfig";

// Initializes firebase
const app = initFirebase();

/**
 * Mongo data access class
 * @class
 */

class Firebase {
	
	readonly collectionName: string;
	private readonly db: Firestore;
	
	/**
	 * Constructor
	 * @param {ConnectionConfig} config
	 * @param {String}           collectionName
	 */
	
	constructor(config: ConnectionConfig, collectionName: string) {
		
		// Sets the table name
		this.collectionName = collectionName;
		
		// Database reference
		this.db = getFirestore();
		
	}
	
	/**
	 * Creates the record
	 * @param {Object} data
	 * @return {Promise<boolean>}
	 */
	
	async insert(data: Object): Promise<any |boolean> {
		
		// Inserts the record
		const result = await addDoc(collection(this.db, this.collectionName), data)
			.then(({ id }) => id)
			.catch(err => {
				return false;
			});
		
		// (:
		return result;
		
	}
	
	/**
	 * Updated the record
	 * @param {*}      id
	 * @param {Object} data
	 * @return {Promise<boolean>}
	 */
	
	async update(id: any, data: object): Promise<boolean> {
		
		// (:
		return await updateDoc(doc(collection(this.db, this.collectionName), id), data)
			.then(() => true)
			.catch(err => {
				return false;
			});
		
	}
	
	/**
	 * Deletes the record
	 * @param {*} id
	 * @return {Promise<boolean>}
	 */
	
	async delete(id: any): Promise<boolean> {
		
		// (:
		return await deleteDoc(doc(collection(this.db, this.collectionName), id))
			.then(() => true)
			.catch(err => {
				return false;
			});
		
	}
	
	/**
	 * Gets a record by id
	 * @param {*} id
	 * @return {object|boolean}
	 */
	async get(id: any): Promise<object | null> {
		
		// Gets the matched record by id
		const result =  await getDoc(doc(collection(this.db, this.collectionName), id))
			.then(doc => ({ id : doc.id, ...doc.data() }))
			.catch(err => {
				return null;
			});
		
		// (:
		return result !== null ? result : null;
		
	}
	
	/**
	 * Gets a record by any field
	 * @param {string} field
	 * @param {*}      value
	 * @return {object|boolean}
	 */
	async getBy(field: string, value: any): Promise<object | null> {
		
		// Gets the matched record by any field
		const result =  await getDocs(query(collection(this.db, this.collectionName), where(field as string, '==', value), limit(1)))
			.then(snapshot => ({ id : snapshot.docs[0].id, ...snapshot.docs[0].data() }))
			.catch(err => {
				return null;
			});
		
		// (:
		return result !== null ? result : null;
		
	}
	
	/**
	 * Gets all record by any field
	 * @param {string} field
	 * @param {*}      value
	 * @return {object|boolean}
	 */
	async getAllBy(field: string, value: any): Promise<object | null> {
		
		// Gets the matched record by any field
		const result =  await getDocs(query(collection(this.db, this.collectionName), where(field as string, '==', value)))
			.then(snapshot => snapshot.docs.map(doc => ({ id : doc.id, ...doc.data() })))
			.catch(err => {
				return null;
			});
		
		// (:
		return result !== null ? result : null;
		
	}
	
	/**
	 * Gets all records
	 * @return {Array|boolean}
	 */
	
	async getAll(): Promise<Array<object>> {
		
		// Get all the products
		const result = await getDocs(query(collection(this.db, this.collectionName)))
			.then(docs => {
				const array: Array<any> = [];
				docs.forEach(doc => array.push({ id : doc.id, ...doc.data() }));
				return array;
			});
		
		// (:
		return result;
		
	}
	
}

export default Firebase;