"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Deal_1 = require("../entity/Deal");
var Repo = /** @class */ (function () {
    function Repo() {
        this.repo = typeorm_1.getConnection().getRepository(Deal_1.Deal);
    }
    Repo.prototype.create = function (_a) {
        var id = _a.id, description = _a.description, price = _a.price;
        var deal = this.repo.create({ description: description, price: price, restaurant: id });
        return this.repo.save(deal);
    };
    Repo.prototype.findById = function (id) {
        return this.repo.findOne({
            where: [
                { id: id },
            ],
        });
    };
    Repo.prototype.getDealsForRestaurant = function (restaurantId) {
        console.log('res::', restaurantId);
        return this.repo.find({
            restaurant: { id: restaurantId }
        });
    };
    Repo.prototype.getDealForRestaurant = function (restaurantId, dealId) {
        console.log('res::', restaurantId);
        return this.repo.find({
            restaurant: { id: restaurantId },
            id: dealId
        });
    };
    return Repo;
}());
exports.default = new Repo();
//# sourceMappingURL=deal.js.map