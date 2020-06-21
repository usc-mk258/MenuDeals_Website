import { Request, Response } from "express";
import * as Joi from '@hapi/joi';
import { RestaurantService } from '../service/restaurantService';
import { NextFunction } from 'connect';
import { generateToken } from "../service/token";
import * as Boom from '@hapi/boom';
import { OrderStatus } from "../entity/Order";
import { Roles } from "../routes/roles";


export default class RestaurantController {

  private service;

  constructor(
    service: RestaurantService = new RestaurantService()
  ) {
    this.service = service;
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = await Joi
      .object({
        email: Joi.string().trim().lowercase().email().required().label('email'),
        name: Joi.string().required().label('name'),
        password: Joi.string().required().label('password'),
      })
      .validateAsync(req.body);
    const result = await this.service.createRestaurant({ email, name, password });
    req.body = {
      name: result.name,
      email: result.email,
      id: result.id,
    };

    next();
  };

  signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = await Joi
      .object({
        email: Joi.string().trim().lowercase().email().required().label('email'),
        password: Joi.string().required().label('password'),
      })
      .validateAsync(req.body);

    try {
      const restaurant = await this.service.findRestaurantByEmail({ email });
      if (!restaurant.status) {
        throw Boom.unauthorized('Admin approval required');
      }
      const token = await generateToken(restaurant, password, Roles.Restaurant);

      req.body = { token, introAdded: !!restaurant.description };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

  addInfo = async (req: any, res: Response, next: NextFunction) => {
    const { description, latitude, longitude, image_url } = await Joi
      .object({
        description: Joi.string().required().label('description'),
        latitude: Joi.string().required().label('latitude'),
        longitude: Joi.string().required().label('longitude'),
        image_url: Joi.array().min(1).required().items(
          Joi.string().trim().required().label('image_url'),
        ).label('image_url'),
      })
      .validateAsync(req.body);
    const result = await this.service.addInfoToRestaurant({ id: req.restaurant.id, description, latitude, longitude, image_url });
    req.body = result;
    next();
  }

  addDeal = async (req: any, res: Response, next: NextFunction) => {
    const { description, price, image_url } = await Joi
      .object({
        description: Joi.string().required().label('description'),
        price: Joi.string().required().label('price'),
        image_url: Joi.string().required().label('Image URL'),
      })
      .validateAsync(req.body);
    const result = await this.service.addDeal({ restaurant: req.restaurant, description, price, image_url });
    req.body = result;
    next();
  }

  getDeals = async (req: any, res: Response, next: NextFunction) => {
    const { restaurant_id } = await Joi
      .object({
        restaurant_id: Joi.string().uuid().required().label('restaurant_id'),
      })
      .validateAsync({
        restaurant_id: req.params.restaurant_id,
      });
    const result = await this.service.getDeals(restaurant_id);
    req.body = result;
    next();
  }

  getDeal = async (req: any, res: Response, next: NextFunction) => {
    const { dealId } = await Joi
      .object({
        dealId: Joi.string().uuid().required().label('dealId'),
      })
      .validateAsync({
        dealId: req.params.dealId,
      });

    const result = await this.service.getDeal(req.restaurant.id, dealId);
    req.body = result;
    next();
  }

  getOrders = async (req: any, res: Response, next: NextFunction) => {

    const result = await this.service.getOrders(req.restaurant.id);
    req.body = result;
    next();
  }

  markOrder = async (req: any, res: Response, next: NextFunction) => {
    const { orderId, status, eta } = await Joi
      .object({
        orderId: Joi.string().uuid().required().label('orderId'),
        status: Joi.bool().required().label('status'),
        eta: Joi.number().when('status', {'is': true, then: Joi.number().required().label('eta when status is true')}),
      })
      .validateAsync({
        orderId: req.params.orderId,
        status: req.params.status,
        eta: req.query.eta
      });

    const result = await this.service.markOrder(req.restaurant.id, orderId, status, eta);
    req.body = result;
    next();
  }

  getInfo = async (req: any, res: Response, next: NextFunction) => {
    const result = await this.service.getInfo(req.restaurant.id);
    req.body = result;
    next();
  }

  getReviews = async (req: any, res: Response, next: NextFunction) => {
    const result = await this.service.getReviews(req.restaurant.id);
    req.body = result;
    next();
  }

}