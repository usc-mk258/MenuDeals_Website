"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asyncMiddleware_1 = require("../middlewares/asyncMiddleware");
var express_1 = require("express");
var restaurantController_1 = require("../controllers/restaurantController");
var authorize_1 = require("../middlewares/authorize");
var roles_1 = require("./roles");
var router = asyncMiddleware_1.default(express_1.Router());
var controller = new restaurantController_1.default();
/**
 * @api {post} /restaurant/signup SignUp Restaurant
 * @apiName SignUp Restaurant
 * @apiGroup Restaurant
 * @apiParam {String} name
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.name
 * @apiSuccess {String} data.email
 * @apiSuccess {String} data.id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   "data": {
 *      "name": "xsaw",
 *      "email": "a1s112223d@a122sd.com",
 *      "id": "3f92b093-7eee-4cc8-ab87-a61fa54a5984"
 *  }
 *
 */
router.post("/restaurant/signup", controller.signup);
/**
 * @api {post} /restaurant/signin Signin Restaurant
 * @apiName SignIn Restaurant
 * @apiGroup Restaurant
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *      "success": true,
 *      "data": {
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *      }
 *    }
 *
 */
router.post("/restaurant/signin", controller.signin);
/**
 * @api {post} /restaurant/add-info Add Info of Restaurant
 * @apiName Add Info of Restaurant
 * @apiGroup Restaurant
 * @apiParam {String} description
 * @apiParam {String} latitude
 * @apiParam {String} longitude
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.id
 * @apiSuccess {String} data.description
 * @apiSuccess {String} data.latitude
 * @apiSuccess {String} data.longitude
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "data": {
        "id": "3f92b093-7eee-4cc8-ab87-a61fa54a5984",
        "description": "edittted@a12112sd.com",
        "latitude": "333,33",
        "longitude": "33.3333",
        "updatedAt": "2020-05-10T20:33:42.694Z"
    }
}
 *
 */
router.post("/restaurant/add-info", authorize_1.authorize(roles_1.Roles.Restaurant), controller.addInfo);
/**
 * @api {post} /restaurant/add-info Add Info of Restaurant
 * @apiName Add Info of Restaurant
 * @apiGroup Restaurant
 * @apiParam {String} description
 * @apiParam {String} price
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.description
 * @apiSuccess {String} data.price
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "data": {
        "description": "rest 2 deal 1",
        "price": "300",
        "restaurant": "3f92b093-7eee-4cc8-ab87-a61fa54a5984",
        "image_url": null,
        "id": "27820b5a-9ce1-4a51-b992-485b82a320e9",
        "createdAt": "2020-05-10T20:36:13.298Z",
        "updatedAt": "2020-05-10T20:36:13.298Z"
    }
}
 *
 */
router.post("/restaurant/deal", authorize_1.authorize(roles_1.Roles.Restaurant), controller.addDeal);
/**
 * @api {get} /restaurant/deals/ Get All Deals of restaurant
 * @apiName Get All Deals of restaurant
 * @apiGroup Restaurant
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Object[]} data.deals
 * @apiSuccess {String} data.deals.id
 * @apiSuccess {String} data.deals.description
 * @apiSuccess {String} data.deals.price
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "success": true,
    "data": [
        {
            "id": "27820b5a-9ce1-4a51-b992-485b82a320e9",
            "description": "rest 2 deal 1",
            "price": "300",
            "image_url": null,
            "createdAt": "2020-05-10T20:36:13.298Z",
            "updatedAt": "2020-05-10T20:36:13.298Z"
        }
    ]
}
 *
 */
router.get("/restaurant/deals", authorize_1.authorize(roles_1.Roles.Restaurant), controller.getDeals);
/**
 * @api {get} /restaurant/deal/:dealId Get One Deal of restaurant
 * @apiName Get One Deals of restaurant
 * @apiGroup Restaurant
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Object} data.deal
 * @apiSuccess {String} data.deal.id
 * @apiSuccess {String} data.deal.description
 * @apiSuccess {String} data.deal.price
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "data":
        {
            "id": "27820b5a-9ce1-4a51-b992-485b82a320e9",
            "description": "rest 2 deal 1",
            "price": "300",
            "image_url": null,
            "createdAt": "2020-05-10T20:36:13.298Z",
            "updatedAt": "2020-05-10T20:36:13.298Z"
        }
}
 *
 */
router.get("/restaurant/deal/:dealId", authorize_1.authorize(roles_1.Roles.Restaurant), controller.getDeal);
exports.default = router;
//# sourceMappingURL=restaurant.js.map