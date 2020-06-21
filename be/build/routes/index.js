"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurant_1 = require("./restaurant");
var admin_1 = require("./admin");
var routes = express_1.Router();
routes.use("/restaurant", restaurant_1.default);
routes.use("/admin", admin_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map