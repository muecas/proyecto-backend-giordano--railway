"use strict";
exports.__esModule = true;
var Product = /** @class */ (function () {
    /**
     * Product constructor
     * @param {String|number|undefined} id
     * @param {String|undefined}        name
     * @param {number|undefined}        price
     * @param {PathLike|undefined}      thumbnail
     */
    function Product(_a) {
        var id = _a.id, name = _a.name, price = _a.price, thumbnail = _a.thumbnail;
        this.id = id;
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    /**
     * Gets the product id
     * @return {String|number|undefined}
     */
    Product.prototype.getId = function () {
        return this.id;
    };
    /**
     * Returns as object
     * @param {boolean} id
     * @return {ProductType}
     */
    Product.prototype.toObject = function (id) {
        if (id === void 0) { id = true; }
        // Sets the returning object
        var object = {
            name: this.name,
            price: this.price,
            thumbnail: this.thumbnail
        };
        // Include id if needed
        id === true && (object.id = this.id);
        // (:
        return object;
    };
    return Product;
}());
exports["default"] = Product;
