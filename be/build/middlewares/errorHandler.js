"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorHandler(err, req, res, next) {
    var joiErr = err;
    if (joiErr.isJoi) {
        res.status(400).send({ success: false, message: joiErr.details[0].message });
        return next();
    }
    var boomErr = err;
    if (boomErr.isBoom) {
        res.status(boomErr.output.statusCode).send({ success: false, message: boomErr.message });
        return next();
    }
    switch (err.name) {
        case 'SyntaxError':
            res.status(400).send({ success: false, message: 'Invalid body syntax' });
            return next();
        default:
            res.status(500).send({
                success: false,
                message: err.message,
            });
            return next();
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map