"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asyncMiddleware_1 = require("../middlewares/asyncMiddleware");
var express_1 = require("express");
var ProcessController_1 = require("../controllers/ProcessController");
var router = asyncMiddleware_1.default(express_1.Router());
var contoller = new ProcessController_1.default();
//Get all users
router.post("/", contoller.create);
router.get("/", contoller.getAll);
router.get("/:id", contoller.getOne);
exports.default = router;
//# sourceMappingURL=process.js.map