"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asyncMiddleware_1 = require("../middlewares/asyncMiddleware");
var express_1 = require("express");
var customerController_1 = require("../controllers/customerController");
var router = asyncMiddleware_1.default(express_1.Router());
var controller = new customerController_1.default();
router.post("/customer/signup", controller.signup);
router.post("/customer/signin", controller.signin);
exports.default = router;
//# sourceMappingURL=customer.js.map