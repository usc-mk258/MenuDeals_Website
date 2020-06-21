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
var Order_1 = require("./Order");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcryptjs");
var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, 8);
    };
    Customer.prototype.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Customer.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "password", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Order_1.Order; }, function (order) { return order.customer; }),
        __metadata("design:type", Array)
    ], Customer.prototype, "orders", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Customer.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Customer.prototype, "updatedAt", void 0);
    Customer = __decorate([
        typeorm_1.Entity('customer'),
        typeorm_1.Unique(["id"])
    ], Customer);
    return Customer;
}());
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map