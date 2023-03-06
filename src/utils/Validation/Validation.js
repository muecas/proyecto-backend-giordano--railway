"use strict";
exports.__esModule = true;
var Validation = /** @class */ (function () {
    function Validation() {
    }
    /**
     * Validates the passed data acording to the passes validation definitions
     * @param {ValidationData}              data
     * @param {Array<ValidationDefinition>} validations
     */
    Validation.validate = function (data, validations) {
        // Validate the passed product
        var results = validations.map(function (_a) {
            var field = _a.field, validator = _a.validator, message = _a.message;
            return validator.call(null, data[field] || null) === false ? { field: field, message: message, valid: false } : { field: field, valid: true };
        });
        // (:
        return {
            valid: results.filter(function (validation) { return validation.valid === true; }),
            errors: results.filter(function (validation) { return validation.valid === false; })
        };
    };
    /**
     * ValidationResult validation
     * @param test {ValidationResults|boolean}
     * @return boolean
     */
    Validation.isValidationResult = function (test) {
        return test !== false && test.errors !== undefined;
    };
    return Validation;
}());
exports["default"] = Validation;
