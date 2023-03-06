"use strict";
exports.__esModule = true;
var Order = /** @class */ (function () {
    /**
     * Cart constructor
     * @param {String|number|undefined} id
     * @param {string|number|undefined} user
     * @param {number|undefined}        timestamp
     * @param {Array<Product>}          products
     * @param {number|undefined}        total
     * @param {number|undefined}        count
     */
    function Order(_a) {
        var id = _a.id, user = _a.user, timestamp = _a.timestamp, products = _a.products, total = _a.total, count = _a.count;
        this.products = [];
        this.id = id;
        this.user = user;
        this.timestamp = timestamp;
        this.products = products || [];
        this.total = total;
        this.count = count;
    }
    /**
     * Returns as object
     * @param {boolean} id
     * @return {OrderType}
     */
    Order.prototype.toObject = function (id) {
        if (id === void 0) { id = true; }
        // Sets the returning object
        var object = {
            user: this.user,
            timestamp: this.timestamp,
            products: this.products,
            total: this.total,
            count: this.count
        };
        // Include id if needed
        id === true && (object.id = this.id);
        // (:
        return object;
    };
    return Order;
}());
exports["default"] = Order;
