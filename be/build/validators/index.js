"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var revalidator = require("revalidator");
var validator = function (obj, schema) {
    var error = revalidator.validate(obj, schema);
    return error.errors[0];
};
exports.default = validator;
//# sourceMappingURL=index.js.map