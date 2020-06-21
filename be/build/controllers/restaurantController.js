"use strict";
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
var Joi = require("@hapi/joi");
var restaurantService_1 = require("../service/restaurantService");
var token_1 = require("../service/token");
var Boom = require("@hapi/boom");
var RestaurantController = /** @class */ (function () {
    function RestaurantController(service) {
        if (service === void 0) { service = new restaurantService_1.RestaurantService(); }
        var _this = this;
        this.signup = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, name, password, result, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Joi
                            .object({
                            email: Joi.string().trim().lowercase().email().required().label('Email'),
                            name: Joi.string().required().label('Name'),
                            password: Joi.string().required().label('Password'),
                        })
                            .validateAsync(req.body)];
                    case 1:
                        _a = _b.sent(), email = _a.email, name = _a.name, password = _a.password;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.service.createRestaurant({ email: email, name: name, password: password })];
                    case 3:
                        result = _b.sent();
                        req.body = {
                            name: result.name,
                            email: result.email,
                            id: result.id,
                        };
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
        this.signin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, restaurant, token, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Joi
                            .object({
                            email: Joi.string().trim().lowercase().email().required().label('Email'),
                            password: Joi.string().required().label('Password'),
                        })
                            .validateAsync(req.body)];
                    case 1:
                        _a = _b.sent(), email = _a.email, password = _a.password;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.service.findRestaurantByEmail({ email: email })];
                    case 3:
                        restaurant = _b.sent();
                        if (!restaurant.status) {
                            throw Boom.unauthorized('Admin approval required');
                        }
                        return [4 /*yield*/, token_1.generateToken(restaurant, password)];
                    case 4:
                        token = _b.sent();
                        req.body = { token: token };
                        next();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        throw Boom.unauthorized(err_1);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.addInfo = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, description, latitude, longitude, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Joi
                            .object({
                            description: Joi.string().required().label('Restaurant ID'),
                            latitude: Joi.string().required().label('Restaurant ID'),
                            longitude: Joi.string().required().label('Restaurant ID'),
                        })
                            .validateAsync(req.body)];
                    case 1:
                        _a = _b.sent(), description = _a.description, latitude = _a.latitude, longitude = _a.longitude;
                        return [4 /*yield*/, this.service.addInfoToRestaurant({ id: req.restaurant.id, description: description, latitude: latitude, longitude: longitude })];
                    case 2:
                        result = _b.sent();
                        req.body = result;
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
        this.addDeal = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, description, price, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Joi
                            .object({
                            description: Joi.string().required().label('Description'),
                            price: Joi.string().required().label('Price'),
                        })
                            .validateAsync(req.body)];
                    case 1:
                        _a = _b.sent(), description = _a.description, price = _a.price;
                        return [4 /*yield*/, this.service.addDeal({ id: req.restaurant.id, description: description, price: price })];
                    case 2:
                        result = _b.sent();
                        req.body = result;
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getDeals = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.getDeals(req.restaurant.id)];
                    case 1:
                        result = _a.sent();
                        req.body = result;
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getDeal = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var dealId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Joi
                            .object({
                            dealId: Joi.string().uuid().required().label('Deal ID'),
                        })
                            .validateAsync({
                            dealId: req.params.dealId,
                        })];
                    case 1:
                        dealId = (_a.sent()).dealId;
                        return [4 /*yield*/, this.service.getDeal(req.restaurant.id, dealId)];
                    case 2:
                        result = _a.sent();
                        req.body = result;
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
        this.service = service;
    }
    return RestaurantController;
}());
exports.default = RestaurantController;
//# sourceMappingURL=restaurantController.js.map