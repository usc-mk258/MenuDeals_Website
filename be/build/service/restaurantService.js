"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var restaurant_1 = require("../respositories/restaurant");
var deal_1 = require("../respositories/deal");
var typedi_1 = require("typedi");
var bcrypt = require("bcrypt");
var Boom = require("@hapi/boom");
var RestaurantService = /** @class */ (function () {
    function RestaurantService() {
    }
    RestaurantService.prototype.createRestaurant = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var email, name, password, restaurant, _a, _b, _c, hashedPassword, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        email = payload.email, name = payload.name, password = payload.password;
                        return [4 /*yield*/, restaurant_1.default.findByEmail(email).catch(function () { return null; })];
                    case 1:
                        restaurant = _d.sent();
                        if (restaurant) {
                            throw Boom.conflict('Restaurant with this email already exist');
                        }
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 6, , 7]);
                        _b = (_a = console).log;
                        _c = ["here here"];
                        return [4 /*yield*/, bcrypt.hash(password, 8)];
                    case 3:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        return [4 /*yield*/, bcrypt.hash(password, 8)];
                    case 4:
                        hashedPassword = _d.sent();
                        console.log("here here", hashedPassword);
                        return [4 /*yield*/, restaurant_1.default.create({ email: email, name: name, password: hashedPassword })];
                    case 5: return [2 /*return*/, _d.sent()];
                    case 6:
                        e_1 = _d.sent();
                        console.log("here here", e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantService.prototype.findRestaurantByEmail = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var email, restaurant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = payload.email;
                        return [4 /*yield*/, restaurant_1.default.findByEmail(email).catch(function () { return null; })];
                    case 1:
                        restaurant = _a.sent();
                        if (!restaurant) {
                            throw Boom.conflict('Restaurant not found');
                        }
                        return [2 /*return*/, restaurant];
                }
            });
        });
    };
    RestaurantService.prototype.findRestaurantById = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var id, restaurant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = payload.id;
                        return [4 /*yield*/, restaurant_1.default.findById(id).catch(function () { return null; })];
                    case 1:
                        restaurant = _a.sent();
                        if (!restaurant) {
                            throw Boom.conflict('Restaurant not found');
                        }
                        return [2 /*return*/, restaurant];
                }
            });
        });
    };
    RestaurantService.prototype.addInfoToRestaurant = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var id, description, latitude, longitude, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = payload.id, description = payload.description, latitude = payload.latitude, longitude = payload.longitude;
                        return [4 /*yield*/, restaurant_1.default.updateInfo(id, {
                                description: description,
                                latitude: latitude,
                                longitude: longitude,
                            })];
                    case 1:
                        update = _a.sent();
                        return [2 /*return*/, update];
                }
            });
        });
    };
    RestaurantService.prototype.addDeal = function (_a) {
        var id = _a.id, description = _a.description, price = _a.price;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, deal_1.default.create({ id: id, description: description, price: price })];
            });
        });
    };
    RestaurantService.prototype.getDeals = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, deal_1.default.getDealsForRestaurant(id)];
            });
        });
    };
    RestaurantService.prototype.getDeal = function (id, dealId) {
        return __awaiter(this, void 0, void 0, function () {
            var deal;
            return __generator(this, function (_a) {
                deal = deal_1.default.getDealForRestaurant(id, dealId);
                if (!deal) {
                    throw Boom.conflict('Deal not found');
                }
                return [2 /*return*/, deal];
            });
        });
    };
    RestaurantService = __decorate([
        typedi_1.Service()
    ], RestaurantService);
    return RestaurantService;
}());
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurantService.js.map