"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
exports.processValidator = function (obj) {
    return index_1.default(obj, {
        properties: {
            name: {
                description: 'name validation',
                message: 'name is required',
                type: 'string',
                required: true
            },
            date: {
                description: 'date validation',
                message: 'date is required',
                type: 'string',
                required: true
            },
            tractorId: {
                description: 'tractorId validation',
                name: "tractorId is required",
                type: 'string',
                required: true
            },
            fieldId: {
                description: 'fieldId validation',
                name: "fieldId is required",
                type: 'string',
                required: true
            },
        }
    });
};
//# sourceMappingURL=process.validator.js.map