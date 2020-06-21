var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var winston = require('winston');
var logger = new winston.Logger({
    level: 'error',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: __dirname + '/error-log.log' })
    ]
});
var errQueryOptions = {
    from: 24 * 60 * 60 * 1000,
    until: new Date,
    limit: 10,
    start: 0,
    level: 'error',
    order: 'desc',
};
module.exports = {
    /* logging the errors */
    logTheError: function (error) {
        logger.log('error', error);
    },
    /* querying the errors */
    queryErrors: function (from, until) {
        if (from === void 0) { from = new Date; }
        if (until === void 0) { until = new Date; }
        return new Promise(function (resolve, reject) {
            logger.query(__assign({}, errQueryOptions, { from: from, until: until }), function (err, results) {
                (err ? reject(err) : resolve(results));
            });
        });
    }
};
//# sourceMappingURL=index.js.map