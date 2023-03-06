"use strict";
exports.__esModule = true;
var Cart = /** @class */ (function () {
    /**
     * Cart constructor
     * @param {String|number|undefined} id
     * @param {number|undefined}        timestamp
     * @param {Array<Product>}          products
     */
    function Cart(_a) {
        var id = _a.id, timestamp = _a.timestamp, products = _a.products;
        this.products = [];
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;
    }
    /**
     * Set the cart products
     * @param {Array<CartProduct>} products
     */
    Cart.prototype.setProducts = function (products) {
        this.products = products;
    };
    /**
     * Get the cart products
     * @return {Array<CartProduct>}
     */
    Cart.prototype.getProducts = function () {
        return this.products;
    };
    /**
     * Returns as object
     * @param {boolean} id
     * @return {CartType}
     */
    Cart.prototype.toObject = function (id) {
        if (id === void 0) { id = true; }
        // Sets the returning object
        var object = {
            timestamp: this.timestamp,
            products: this.products
        };
        // Include id if needed
        id === true && (object.id = this.id);
        // (:
        return object;
    };
    return Cart;
}());
exports["default"] = Cart;
