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
var Field_1 = require("./Field");
var Tractor_1 = require("./Tractor");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Process = /** @class */ (function () {
    function Process() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Process.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Process.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.CreateDateColumn({ type: 'date' }),
        __metadata("design:type", String)
    ], Process.prototype, "date", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Tractor_1.Tractor; }, function (tractor) { return tractor.processes; }),
        __metadata("design:type", Tractor_1.Tractor)
    ], Process.prototype, "tractor", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Field_1.Field; }, function (field) { return field.processes; }),
        __metadata("design:type", Field_1.Field)
    ], Process.prototype, "field", void 0);
    Process = __decorate([
        typeorm_1.Entity()
    ], Process);
    return Process;
}());
exports.Process = Process;
//# sourceMappingURL=Process.js.map