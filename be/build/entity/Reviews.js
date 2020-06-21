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
var typeorm_1 = require("typeorm");
var Restaurant_1 = require("./Restaurant");
var Review = /** @class */ (function () {
    function Review() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Review.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Review.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column('enum', { name: 'rating', enum: [1, 2, 3, 4, 5] }),
        __metadata("design:type", String)
    ], Review.prototype, "rating", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Restaurant_1.Restaurant; }, function (restaurant) { return restaurant.reviews; }),
        __metadata("design:type", Restaurant_1.Restaurant)
    ], Review.prototype, "restaurant", void 0);
    Review = __decorate([
        typeorm_1.Entity('reviews'),
        typeorm_1.Unique(["id"])
    ], Review);
    return Review;
}());
exports.Review = Review;
//# sourceMappingURL=Reviews.js.map