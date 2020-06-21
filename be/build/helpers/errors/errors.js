"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalError = function (message) {
    if (message === void 0) { message = "Not Found"; }
    throw {
        statusCode: 400,
        message: message
    };
};
exports.validityError = function (error) {
    if (error) {
        throw error;
    }
};
//# sourceMappingURL=errors.js.map