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
var customerService_1 = require("../service/customerService");
var token_1 = require("../service/token");
var Boom = require("@hapi/boom");
var AdminController = /** @class */ (function () {
    function AdminController(service) {
        if (service === void 0) { service = new customerService_1.CustomerService(); }
        var _this = this;
        this.signup = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, name, password, result;
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
                        return [4 /*yield*/, this.service.createCustomer({ email: email, name: name, password: password })];
                    case 2:
                        result = _b.sent();
                        req.body = {
                            name: result.name,
                            email: result.email,
                            id: result.id,
                        };
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
        this.signin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, customer, token, err_1;
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
                        return [4 /*yield*/, this.service.findCustomerByEmail({ email: email })];
                    case 3:
                        customer = _b.sent();
                        return [4 /*yield*/, token_1.generateToken(customer, password)];
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
        this.service = service;
    }
    return AdminController;
}());
exports.default = AdminController;
//# sourceMappingURL=customerController.js.map