"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("./Customer");
var typeorm_1 = require("typeorm");
var Deal_1 = require("./Deal");
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Order.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Order.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Customer_1.Customer; }, function (customer) { return customer.orders; }),
        __metadata("design:type", Customer_1.Customer)
    ], Order.prototype, "customer", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Deal_1.Deal; }, function (deal) { return deal.orders; }),
        __metadata("design:type", Deal_1.Deal)
    ], Order.prototype, "deal", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Order.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Order.prototype, "createdAt", void 0);
    Order = __decorate([
        typeorm_1.Entity('order'),
        typeorm_1.Unique(["id"])
    ], Order);
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=Order.js.map