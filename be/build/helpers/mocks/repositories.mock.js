"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RepositoryMock = /** @class */ (function () {
    function RepositoryMock() {
        this.findMock = jest.fn();
        this.findOneMock = jest.fn();
        this.createAndSaveMock = jest.fn();
        this.deleteMock = jest.fn();
    }
    RepositoryMock.prototype.find = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.findMock(args);
        return Promise.resolve(this.list);
    };
    RepositoryMock.prototype.findOne = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.findOneMock(args);
        return Promise.resolve(this.one);
    };
    RepositoryMock.prototype.save = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.createAndSaveMock(value, args);
        return Promise.resolve(value);
    };
    RepositoryMock.prototype.delete = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.deleteMock(value, args);
        return Promise.resolve(value);
    };
    return RepositoryMock;
}());
exports.RepositoryMock = RepositoryMock;
//# sourceMappingURL=repositories.mock.js.map