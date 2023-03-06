// Validation data type
type ValidationData = {
	[key: string]: any
};

// Validation definition type
type ValidationDefinition = {
	[key: string]: string | Function,
	field: string,
	validator: Function,
	message: string
};

// Validation single result type
type ValidationResult = {
	[key: string]: string | boolean | undefined,
	field: string,
	message?: string,
	valid: boolean
};

// Validation results object type
type ValidationResults = {
	[key: string]: Array<ValidationResult>,
	valid: Array<ValidationResult>,
	errors: Array<ValidationResult>
};

class Validation {
	
	/**
	 * Validates the passed data acording to the passes validation definitions
	 * @param {ValidationData}              data
	 * @param {Array<ValidationDefinition>} validations
	 */
	
	static validate(data: ValidationData, validations: Array<ValidationDefinition>): ValidationResults {
		
		// Validate the passed product
		const results: Array<ValidationResult> = validations.map(({ field, validator, message }: ValidationDefinition): ValidationResult => validator.call(null, data[field] || null) === false ? { field, message, valid : false } : { field, valid : true });
		
		// (:
		return {
			valid  : results.filter((validation: ValidationResult) => validation.valid === true),
			errors : results.filter((validation: ValidationResult) => validation.valid === false)
		};
		
	}
	
	/**
	 * ValidationResult validation
	 * @param test {ValidationResults|boolean}
	 * @return boolean
	 */
	
	static isValidationResult(test: ValidationResults | boolean): boolean {
		return test !== false && (test as ValidationResults).errors !== undefined;
	}
	
}

export { ValidationData, ValidationDefinition, ValidationResult, ValidationResults };
export default Validation;