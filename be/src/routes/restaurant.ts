import toAsyncRouter from '../middlewares/asyncMiddleware';
import { Router } from "express";
import RestaurantController from "../controllers/restaurantController";
import { authorize } from '../middlewares/authorize';
import { Roles } from './roles';


const router = toAsyncRouter(Router());
const controller = new RestaurantController();


/**
 * @api {post} /restaurant/signup SignUp Restaurant
 * @apiName SignUp Restaurant
 * @apiGroup Restaurant
 * @apiParam {String} name
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiParamExample Request:
 {
  "email": "admin@burgerlab.com",
  "name": "burgerlab"
  "password": "asdasd"
}

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

  * @apiParamExample Request:
 {
  "email": "admin@burgerlab.com",
  "password": "asdasd"
}
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
 * @apiParam {Array} image_url String (base64)
 * @apiParamExample Request:
*  {
    "description": "edittted@a12112sd.com",
    "latitude": "24.860735",
    "longitude": "67.001137",
    "image_url": ["data:image/png;base64,iVBORw....", "data:image/png;base64,DecTGHE...."]
    }

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
router.post("/restaurant/add-info", authorize(Roles.Restaurant), controller.addInfo);


/**
 * @api {get} /restaurant/info get restaurant Info
 * @apiName get restaurant Info
 * @apiGroup Restaurant
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
  @apiParam {String} orderId GUUID of order
  @apiParam {Boolea} status Boolean value true for PENDING and false for REJECTED
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Object} data.id
 * @apiSuccess {String} data.status
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

router.get("/restaurant/info", authorize(Roles.Restaurant), controller.getInfo);

/**
 * @api {post} /restaurant/deal Add Deal
 * @apiName Add Deal
 * @apiGroup Restaurant
 * @apiParam {String} description
 * @apiParam {String} price
 * @apiParam {String} image_url (base64)
 * @apiParamExample Request:

 {
  "description": "rest 2 deal 6",
  "price": "700",
  "image_url": "data:image/png;base64,iVBORw0K...."
}

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
router.post("/restaurant/deal", authorize(Roles.Restaurant), controller.addDeal);

/**
 * @api {get} /restaurant/deals/:restaurant_id Get All Deals of restaurant
 * @apiName Get All Deals of restaurant
 * @apiGroup Restaurant
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
 * @apiParam {String} restaurant_id GUUID of restaurant
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

router.get("/restaurant/deals/:restaurant_id", authorize(Roles.Restaurant), controller.getDeals);

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

router.get("/restaurant/deal/:dealId", authorize(Roles.Restaurant), controller.getDeal);
/**
 * @api {get} /restaurant/orders/ Get All orders of restaurant
 * @apiName Get All orders of restaurant
 * @apiGroup Restaurant
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object[]} data.order
 * @apiSuccess {String} data.order.id
 * @apiSuccess {String} data.order.status
 * @apiSuccess {String} data.order.updatedAt
 * @apiSuccess {String} data.order.createdAt
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "id": "41bf61d1-b610-450f-aa1d-19c482af846d",
            "status": "PENDING",
            "updatedAt": "2020-05-16T23:34:54.275Z",
            "createdAt": "2020-05-16T21:35:56.135Z"
        },
        {
            "id": "2874a1d0-2f94-4449-84cc-0e969e582a12",
            "status": "DELIVERED",
            "updatedAt": "2020-05-16T23:37:03.388Z",
            "createdAt": "2020-05-16T21:37:30.923Z"
        },
        {
            "id": "2f5fbc69-80c7-4276-86ec-11f0eb85528b",
            "status": "RECEIVED",
            "updatedAt": "2020-05-16T23:37:15.947Z",
            "createdAt": "2020-05-16T21:36:55.083Z"
        }
    ]
}
 *
 */
router.get("/restaurant/orders/", authorize(Roles.Restaurant), controller.getOrders);

/**
 * @api {get} /restaurant/order/mark/:orderId/:status?eta=1 Mark Order PENDING or REJECTED
 * @apiName Mark Restaurant Delivered
 * @apiGroup Restaurant
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
  @apiParam {String} orderId GUUID of order
  @apiParam {Boolean} status Boolean value true for PENDING and false for REJECTED
  @apiParam {Number} eta query param for Estimated time 
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Object} data.id
 * @apiSuccess {String} data.status
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "id": "2874a1d0-2f94-4449-84cc-0e969e582a12",
        "status": "DELIVERED"
    }
}
 *
 */

router.get("/restaurant/order/mark/:orderId/:status", authorize(Roles.Restaurant), controller.markOrder);

/**
 * @api {get} /restaurant/reviews Get Restaurant Reviews
 * @apiName Get Restaurant Reviews
 * @apiGroup Restaurant
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
  @apiParam {String} orderId GUUID of order
  @apiParam {Boolea} status Boolean value true for PENDING and false for REJECTED
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Object} data.id
 * @apiSuccess {String} data.status
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.get("/restaurant/reviews", authorize(Roles.Restaurant), controller.getReviews)

export default router;