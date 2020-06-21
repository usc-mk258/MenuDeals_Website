"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asyncHandler = function (func) { return function (req, res, next) { return Promise.resolve(func(req, res, next)).catch(next); }; };
var methods = [
    'get',
    'post',
    'put',
    'delete'
];
function toAsyncRouter(router) {
    var _loop_1 = function (key) {
        if (methods.includes(key)) {
            var method_1 = router[key];
            router[key] = function (path) {
                var callbacks = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    callbacks[_i - 1] = arguments[_i];
                }
                return method_1.call.apply(method_1, [router, path].concat(callbacks.map(function (cb) { return asyncHandler(cb); })));
            };
        }
    };
    for (var key in router) {
        _loop_1(key);
    }
    return router;
}
toAsyncRouter.setMethods = function (methodsArray) {
    methods = methodsArray.slice();
};
toAsyncRouter.getMethods = function () { return methods.slice(); };
exports.default = toAsyncRouter;
//# sourceMappingURL=asyncMiddleware.js.map