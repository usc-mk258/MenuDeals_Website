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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var FieldRepo_1 = require("./../respositories/FieldRepo");
var typedi_1 = require("typedi");
var typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
var ProcessRepo_1 = require("../respositories/ProcessRepo");
var errors_1 = require("../helpers/errors/errors");
var process_validator_1 = require("../validators/process.validator");
var TractorRepo_1 = require("../respositories/TractorRepo");
var ProcessService = /** @class */ (function () {
    function ProcessService(repo, fieldRepo, tractorRepo) {
        if (repo === void 0) { repo = new ProcessRepo_1.ProcessRepo; }
        if (fieldRepo === void 0) { fieldRepo = new FieldRepo_1.FieldRepo; }
        if (tractorRepo === void 0) { tractorRepo = new TractorRepo_1.TractorRepo; }
        this.repo = repo;
        this.fieldRepo = fieldRepo;
        this.tractorRepo = tractorRepo;
    }
    ProcessService.prototype.create = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var name, date, tractorId, fieldId, error, tractor, field;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = payload.name, date = payload.date, tractorId = payload.tractorId, fieldId = payload.fieldId;
                        // const found = await this.repo.findByName(name);
                        // if (found) generalError(`Tractor with name ${name} already exist please try other name`);
                        // return await this.repo.create({ name });
                        console.log();
                        error = process_validator_1.processValidator({ name: name, date: date, tractorId: tractorId, fieldId: fieldId });
                        errors_1.validityError(error);
                        return [4 /*yield*/, this.tractorRepo.getOne(tractorId)];
                    case 1:
                        tractor = _a.sent();
                        return [4 /*yield*/, this.fieldRepo.getOne(fieldId)];
                    case 2:
                        field = _a.sent();
                        if (!(tractor && field)) {
                            errors_1.generalError("Tractor or field not found");
                        }
                        return [4 /*yield*/, this.repo.create({ name: name, date: date, tractor: tractor, field: field })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProcessService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.getAll()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessService.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.getOne(id)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProcessService = __decorate([
        typedi_1.Service(),
        __param(0, typeorm_typedi_extensions_1.InjectRepository()),
        __param(0, typeorm_typedi_extensions_1.OrmRepository()),
        __param(1, typeorm_typedi_extensions_1.OrmRepository()),
        __param(2, typeorm_typedi_extensions_1.OrmRepository()),
        __metadata("design:paramtypes", [ProcessRepo_1.ProcessRepo,
            FieldRepo_1.FieldRepo,
            TractorRepo_1.TractorRepo])
    ], ProcessService);
    return ProcessService;
}());
exports.ProcessService = ProcessService;
//# sourceMappingURL=processService.js.map