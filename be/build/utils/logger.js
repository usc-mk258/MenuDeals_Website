"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bunyan = require("bunyan");
exports.default = new Bunyan({
    name: 'Restaurant-API',
    serializers: Bunyan.stdSerializers,
    streams: [{
            level: 'debug',
            stream: process.stdout,
        }],
});
//# sourceMappingURL=logger.js.map