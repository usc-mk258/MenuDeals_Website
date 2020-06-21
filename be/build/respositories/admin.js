"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Admin_1 = require("./../entity/Admin");
var typeorm_1 = require("typeorm");
var Repo = /** @class */ (function () {
    function Repo() {
        this.repo = typeorm_1.getConnection().getRepository(Admin_1.Admin);
    }
    Repo.prototype.findByEmail = function (email) {
        return this.repo.findOne({
            where: [
                { email: email },
            ],
        });
    };
    Repo.prototype.findById = function (id) {
        return this.repo.findOne({
            where: [
                { id: id },
            ],
        });
    };
    return Repo;
}());
exports.default = new Repo();
//# sourceMappingURL=admin.js.map