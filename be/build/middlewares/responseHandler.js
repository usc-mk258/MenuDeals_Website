"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = function (req, res, next) {
    console.log("here here", req);
    if (req.body) {
        res.send({
            success: true,
            data: req.body
        });
    }
    else {
        next();
    }
};
//# sourceMappingURL=responseHandler.js.map