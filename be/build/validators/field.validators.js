"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
exports.fieldValidator = function (obj) {
    return index_1.default(obj, {
        properties: {
            name: {
                description: 'name validation',
                message: 'name is required',
                type: 'string',
                required: true
            },
            area: {
                description: 'area validation',
                message: 'area is required',
                type: 'number',
                required: true
            },
            cropType: {
                description: 'cropType validation',
                name: "cropType",
                type: 'string',
                enum: ['Wheat', 'Broccoli', 'Strawberries'],
                required: true
            },
        }
    });
};
//# sourceMappingURL=field.validators.js.map