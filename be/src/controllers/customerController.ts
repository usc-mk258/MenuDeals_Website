import { Request, Response } from "express";
import * as Joi from '@hapi/joi';
import { CustomerService } from '../service/customerService';
import { NextFunction } from 'connect';
import { generateToken } from "../service/token";
import * as Boom from '@hapi/boom';
import { Roles } from "../routes/roles";


export default class AdminController {

  private service;

  constructor(
    service: CustomerService = new CustomerService()
  ) {
    this.service = service;
  }


  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = await Joi
      .object({
        email: Joi.string().trim().lowercase().email().required().label('Email'),
        name: Joi.string().required().label('Name'),
        password: Joi.string().required().label('Password'),
      })
      .validateAsync(req.body);
    const result = await this.service.createCustomer({ email, name, password });
    req.body = {
      name: result.name,
      email: result.email,
      id: result.id,
    };
    next();
  };

  signin = async (req: any, res: Response, next: NextFunction) => {
    const { email, password, mobile_token } = await Joi
      .object({
        email: Joi.string().trim().lowercase().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
        mobile_token: Joi.string().label('mobile_token'),
      })
      .validateAsync(req.body);

    try {
      const customer = await this.service.findCustomerByEmail({ email });
      const token = await generateToken(customer, password, "Customer");
      if (mobile_token) {
        this.service.saveToken(mobile_token, customer.id);
      }
      req.body = { token };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

  nearByRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const { latitude, longitude } = await Joi
      .object({
        latitude: Joi.string().required().label('Latitude'),
        longitude: Joi.string().required().label('Longitude'),
      })
      .validateAsync(req.body);

    try {
      const restaurants = await this.service.findRestaurantsByLatLng({ latitude, longitude });
      req.body = { restaurants };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

  placeOrder = async (req: any, res: Response, next: NextFunction) => {
    const { dealId } = await Joi
      .object({
        dealId: Joi.string().uuid().required().label('Order ID'),
      })
      .validateAsync({
        dealId: req.params.dealId,
      });

    try {
      const orderId = await this.service.placeOrder({ dealId, customerId: req.customer.id });
      req.body = { orderId };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

  getAllOrders = async (req: any, res: Response, next: NextFunction) => {
    try {
      const orders = await this.service.getAllOrders({ customerId: req.customer.id });
      req.body = { orders };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

  markReceived = async (req: any, res: Response, next: NextFunction) => {
    const { orderId } = await Joi
      .object({
        orderId: Joi.string().uuid().required().label('Order ID'),
      })
      .validateAsync({
        orderId: req.params.orderId,
      });

    const result = await this.service.markOrderReceived(req.customer.id, orderId);
    req.body = result;
    next();
  };

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

  postReview = async (req: any, res: Response, next: NextFunction) => {
    const { restaurant_id, rating, description } = await Joi
      .object({
        restaurant_id: Joi.string().uuid().required().label('restaurant_id'),
        rating: Joi.number().required().label('rating'),
        description: Joi.string().required().label('description'),
      })
      .validateAsync({
        restaurant_id: req.params.restaurant_id,
        rating: req.body.rating,
        description: req.body.description,
      });
    const result = await this.service.postReview(restaurant_id, rating, description);
    req.body = result;
    next();
  }

  getRestaurantReviews = async(req: any, res: Response, next: NextFunction) => {
    const { restaurant_id } = await Joi
      .object({
        restaurant_id: Joi.string().uuid().required().label('restaurant_id'),
      })
      .validateAsync({
        restaurant_id: req.params.restaurant_id,
      });

    const result = await this.service.getRestaurantReviews(restaurant_id);
    req.body = result;
    next();
  }

  updateLocation = async (req: any, res: Response, next: NextFunction) => {
    const { latitude, longitude } = await Joi
      .object({
        latitude: Joi.string().required().label('latitude'),
        longitude: Joi.string().required().label('longitude'),
      })
      .validateAsync(req.body);
    const result = await this.service.updateLocation({ latitude, longitude, id: req.customer.id });
    req.body = result;
    next();
  } 

}