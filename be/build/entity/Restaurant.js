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
var Deal_1 = require("./Deal");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcryptjs");
var Reviews_1 = require("./Reviews");
var Restaurant = /** @class */ (function () {
    function Restaurant() {
    }
    Restaurant.prototype.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, 8);
    };
    Restaurant.prototype.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Restaurant.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Restaurant.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Restaurant.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], Restaurant.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column("geometry", {
            spatialFeatureType: "Point",
            srid: 4326,
            nullable: true
        }),
        typeorm_1.Index({ spatial: true }),
        __metadata("design:type", Object)
    ], Restaurant.prototype, "point", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Deal_1.Deal; }, function (deal) { return deal.restaurant; }),
        __metadata("design:type", Array)
    ], Restaurant.prototype, "deals", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Reviews_1.Review; }, function (review) { return review.restaurant; }),
        __metadata("design:type", Array)
    ], Restaurant.prototype, "reviews", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Restaurant.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Restaurant.prototype, "createdAt", void 0);
    Restaurant = __decorate([
        typeorm_1.Entity()
    ], Restaurant);
    return Restaurant;
}());
exports.Restaurant = Restaurant;
//# sourceMappingURL=Restaurant.js.map