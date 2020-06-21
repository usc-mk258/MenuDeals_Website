"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
exports.tractorValidator = function (obj) {
    return index_1.default(obj, {
        properties: {
            name: {
                description: 'name validation',
                message: 'name is required',
                type: 'string',
                required: true
            }
        }
    });
};
//# sourceMappingURL=tractor.validator.js.map