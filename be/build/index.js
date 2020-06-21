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
require("reflect-metadata");
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var bunyanMiddleware = require("express-bunyan-logger");
var fg = require("fast-glob");
var helmet = require("helmet");
var typeorm_1 = require("typeorm");
var errorHandler_1 = require("./middlewares/errorHandler");
var logger_1 = require("./utils/logger");
var responseHandler_1 = require("./middlewares/responseHandler");
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var app, routes, _i, routes_1, routePath, router;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.createConnection()];
                case 1:
                    _a.sent();
                    app = express();
                    // Register middlewares
                    app.use(cors());
                    app.use(helmet({ hidePoweredBy: true }));
                    app.use(bodyParser.json());
                    app.use(bunyanMiddleware({
                        logger: logger_1.default,
                        parseUA: false,
                        excludes: ['response-hrtime', 'req-headers', 'res-headers'],
                        format: ':incoming :method :url :status-code',
                    }));
                    return [4 /*yield*/, fg('./routes/*.ts', { cwd: __dirname })];
                case 2:
                    routes = _a.sent();
                    _i = 0, routes_1 = routes;
                    _a.label = 3;
                case 3:
                    if (!(_i < routes_1.length)) return [3 /*break*/, 6];
                    routePath = routes_1[_i];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require(routePath); })];
                case 4:
                    router = (_a.sent()).default;
                    if (typeof (router) === 'function')
                        app.use(router);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    app.use(responseHandler_1.responseHandler);
                    // Error handler must come last...
                    app.use(errorHandler_1.default);
                    // Kick it off!
                    app.listen(3200, function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            logger_1.default.info({ port: 3200 }, 'Hey! I\'m listening...');
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
start();
//# sourceMappingURL=index.js.map