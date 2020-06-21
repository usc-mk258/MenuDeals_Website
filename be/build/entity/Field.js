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
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Process_1 = require("./Process");
var CropEnum;
(function (CropEnum) {
    CropEnum[CropEnum["Wheat"] = 0] = "Wheat";
    CropEnum[CropEnum["Broccoli"] = 1] = "Broccoli";
    CropEnum[CropEnum["Strawberries"] = 2] = "Strawberries";
})(CropEnum = exports.CropEnum || (exports.CropEnum = {}));
var Field = /** @class */ (function () {
    function Field() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Field.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Field.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            type: "enum",
            enum: [
                "Wheat",
                "Broccoli",
                "Strawberries"
            ],
        }),
        __metadata("design:type", Number)
    ], Field.prototype, "cropType", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({ type: 'float' }),
        __metadata("design:type", Number)
    ], Field.prototype, "area", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Process_1.Process; }, function (process) { return process.field; }),
        __metadata("design:type", Array)
    ], Field.prototype, "processes", void 0);
    Field = __decorate([
        typeorm_1.Entity()
    ], Field);
    return Field;
}());
exports.Field = Field;
//# sourceMappingURL=Field.js.map