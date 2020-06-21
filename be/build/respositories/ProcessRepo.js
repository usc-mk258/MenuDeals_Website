"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Process_1 = require("../entity/Process");
var typeorm_1 = require("typeorm");
var errors_1 = require("../helpers/errors/errors");
var ProcessRepo = /** @class */ (function (_super) {
    __extends(ProcessRepo, _super);
    function ProcessRepo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessRepo.prototype.create = function (field) {
        var instance = new Process_1.Process();
        instance.name = field.name;
        instance.date = field.date;
        instance.tractor = field.tractor;
        instance.field = field.field;
        return typeorm_1.getManager().save(instance);
    };
    ProcessRepo.prototype.getAll = function () {
        return typeorm_1.getManager().find("Tractor");
    };
    ProcessRepo.prototype.getOne = function (id) {
        try {
            return typeorm_1.getManager().findOneOrFail("Tractor", { id: id });
        }
        catch (e) {
            errors_1.generalError('Field Not found');
        }
    };
    ProcessRepo.prototype.findByName = function (name) {
        return typeorm_1.getManager().findOneOrFail("Tractor", { name: name });
    };
    ProcessRepo = __decorate([
        typeorm_1.EntityRepository(Process_1.Process)
    ], ProcessRepo);
    return ProcessRepo;
}(typeorm_1.AbstractRepository));
exports.ProcessRepo = ProcessRepo;
//# sourceMappingURL=ProcessRepo.js.map