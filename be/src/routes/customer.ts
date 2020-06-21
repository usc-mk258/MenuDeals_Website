import toAsyncRouter from '../middlewares/asyncMiddleware';
import { Router } from "express";
import CustomerController from "../controllers/customerController";
import { Roles } from './roles';
import { authorize } from '../middlewares/authorize';

const router = toAsyncRouter(Router());
const controller = new CustomerController();


/**
 * @api {post} /customer/signup SignUp Customer
 * @apiName SignUp Customer
 * @apiGroup Customer
 * @apiParam {String} name     
 * @apiParam {String} email     
 * @apiParam {String} password     
 * @apiParamExample Request:
 {
  "email": "john@doe.com",
  "name": "john Doe"
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
 *      "name": "john Doe",
 *      "email": "john@doe.com",
 *      "id": "3f92b093-7eee-4cc8-ab87-a61fa54a5984"
 *  }
 *
 */

router.post("/customer/signup", controller.signup);
/**
 * @api {post} /customer/signin Signin Customer
 * @apiName SignIn Customer
 * @apiGroup Customer
 * @apiParam {String} email     
 * @apiParam {String} password  
 * @apiParam {String} mobile_token (optional)  
 
  * @apiParamExample Request:
 {
  "email": "john@doe.com",
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
router.post("/customer/signin", controller.signin);
/**
 * @api {post} /customer/nearby-restaurant Find NearBy Restaurant
 * @apiName Find NearBy Restaurant
 * @apiGroup Customer
 * @apiParam {String} latitude     
 * @apiParam {String} longitude  
 
  * @apiParamExample Request:
{
  "latitude": "24.860735",
  "longitude": "67.001137"
}

 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Object[]} data.restaurants
 * @apiSuccess {string} data.restaurants.id
 * @apiSuccess {string} data.restaurants.email
 * @apiSuccess {string} data.restaurants.name
 * @apiSuccess {string} data.restaurants.description
 * @apiSuccess {Array[]} data.restaurants.image_url
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "data": {
        "restaurants": [
            {
                "id": "d74c496c-73df-493c-b82e-122f05f04b1d",
                "name": "pizza",
                "email": "admin@pizza.com",
                "image_url": null,
                "address": {
                    "type": "Point",
                    "coordinates": [
                        67.001137,
                        24.860735
                    ]
                },
                "description": "edittted@a12112sd.com"
            }
             ]
    }
}
 *
 */
router.post("/customer/nearby-restaurant", controller.nearByRestaurant);
/**
 * @api {post} /customer/place-order/:dealId Place order against Deal
 * @apiName Place order against Deal
 * @apiGroup Customer
 * @apiParam {String} description     
 * @apiParam {String} price  
 
  * @apiParamExample Request:
{
  "description": "deal 3",
  "price": "500"
}

 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {string} data.orderId
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "data": {
        "orderId": "77c50517-a5ff-4488-be71-52681f4e1ce8"
    }
}
 *
 */
router.post("/customer/place-order/:dealId", authorize(Roles.Client), controller.placeOrder);
/**
 * @api {get} /customer/orders Get all orders of Customer
 * @apiName Get all orders of Customer
 * @apiGroup Customer
 * @apiParam {String} description     
 * @apiParam {String} price  
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
router.get("/customer/orders", authorize(Roles.Client), controller.getAllOrders);
/**
 * @api {get} /customer/order/received/:orderId/ Mark Order Received
 * @apiName Mark Order Received
 * @apiGroup Customer
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
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
        "status": "RECEIVED"
    }
}
 *
 */
router.get("/customer/order/received/:orderId/", authorize(Roles.Client), controller.markReceived);

/**
 * @api {get} /customer/restaurant-deals/:restaurant_id Get All Deals of a restaurant
 * @apiName Get All Deals of a restaurant
 * @apiGroup Customer
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

 router.get("/customer/restaurant-deals/:restaurant_id", authorize(Roles.Client), controller.getDeals);
 
 /**
 * @api {post} /customer/restaurant-review/:restaurant_id Add Restaurant Reviews
 * @apiName Add Restaurant Reviews
 * @apiGroup Customer
 * @apiParam {String} description     
 * @apiParam {Number} rating Rating between 0 - 5  
 
  * @apiParamExample Request:
{
  "description": "very good",
  "rating": 5
}

 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {string} data.orderId
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
 
 router.post("/customer/restaurant-review/:restaurant_id", authorize(Roles.Client), controller.postReview);

 /**
 * @api {get} /customer/restaurant-reviews/:restaurant_id Get Restaurant Reviews
 * @apiName Get Restaurant Reviews
 * @apiGroup Customer
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
router.get("/customer/restaurant-reviews/:restaurant_id", authorize(Roles.Client), controller.getRestaurantReviews)

/**
 * @api {post} /customer/location Update Location
 * @apiName Update Location
 * @apiGroup Customer
 * @apiParam {String} latitude
 * @apiParam {String} longitude
 * @apiParamExample Request:
*  {
    "latitude": "24.860735",
    "longitude": "67.001137",
    }

 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.id
 * @apiSuccess {String} data.latitude
 * @apiSuccess {String} data.longitude
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "data": {
        "id": "3f92b093-7eee-4cc8-ab87-a61fa54a5984",
        "latitude": "333,33",
        "longitude": "33.3333",
    }
}
 *
 */
router.post("/customer/location", authorize(Roles.Client), controller.updateLocation);

export default router;