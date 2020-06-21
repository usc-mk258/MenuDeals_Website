import toAsyncRouter from '../middlewares/asyncMiddleware';
import { Router } from "express";
import AdminController from "../controllers/adminController";
import { authorize } from '../middlewares/authorize';
import { Roles } from './roles';


const router = toAsyncRouter(Router());
const controller = new AdminController();

/**
 * @api {post} /admin/signin Signin Admin
 * @apiName SignIn Admin
 * @apiGroup Admin
 * @apiParam {String} email     
 * @apiParam {String} password     
 * @apiParamExample Request: 
 {
  "email": "admin@app.com",
  "password": "helloworld"
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
router.post("/admin/signin", controller.signin);

/**
 * @api {get} /admin/restaurants Get all Restaurants
 * @apiName Get all Restaurants Admin
 * @apiGroup Admin
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Object[]} data.restaurants
 * @apiSuccess {String} data.restaurants.id
 * @apiSuccess {String} data.restaurants.email
 * @apiSuccess {String} data.restaurants.name
 * @apiSuccess {String} data.restaurants.password
 * @apiSuccess {String} data.restaurants.description
 * @apiSuccess {String} data.restaurants.status
 * @apiSuccess {String} data.restaurants.updatedAt
 * @apiSuccess {String} data.restaurants.createdAt
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *      "success": true,
 *      "data": {
 *        "restaurants": [
 *              {
 *                  "id": "9077fc7a-78a0-4457-ba15-7e1a2b9c919a",
 *                  "email": "as11d@asd.com",
 *                  "name": "as1d",
 *                  "password": "sad1asd",
 *                  "description": null,
 *                  "status": false,
 *                  "updatedAt": "2020-05-02T12:24:40.877Z",
 *                  "createdAt": "2020-05-02T12:24:40.877Z"
 *              },
 *              {
 *                  "id": "9af6de24-9b32-4063-ac9a-c4f45e5ae54b",
 *                  "email": "as1123d@asd.com",
 *                  "name": "a4s1d",
 *                  "password": "$2b$08$PtVgwy3Jv3NGgpjQfottT.g.uPLa9SO4hHE8/DQKP98rCFQIXo43O",
 *                  "description": null,
 *                  "status": false,
 *                  "updatedAt": "2020-05-02T12:28:31.266Z",
 *                  "createdAt": "2020-05-02T12:28:31.266Z"
 *              }
 *          ]
 *         }
 *       }
 *
 */

router.get("/admin/restaurants", authorize(Roles.Admin), controller.getAllRestaurant);

/**
 * @api {get} /admin/restaurant/:id/:status Set status of Restaurant
 * @apiParam {Number} id Restaurant unique ID.
 * @apiParam {Boolean} status set Restaurant Active or In-Active.
 * @apiName Get a Restaurant Admin
 * @apiGroup Admin
 * @apiHeader {String} authorization bearer + token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM"
 *     }
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} data
 * @apiSuccess {Boolean} data.status
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *        "success": true,
 *        "data": {
 *            "status": true
 *        }
 *    }
 *
 */

router.get("/admin/restaurant/:id/:status", authorize(Roles.Admin), controller.approveRestaurant);



export default router;