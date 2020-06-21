import { Request, Response } from "express";
import * as Joi from '@hapi/joi';
import { AdminService } from '../service/adminService';
import { NextFunction } from 'connect';
import { generateToken } from "../service/token";
import * as Boom from '@hapi/boom';
import { Roles } from '../routes/roles';


export default class AdminController {

  private service;

  constructor(
    service: AdminService = new AdminService()
  ) {
    this.service = service;
  }

  signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = await Joi
      .object({
        email: Joi.string().trim().lowercase().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
      })
      .validateAsync(req.body);

    try {
      const admin = await this.service.findAdminByEmail({ email });
      const token = await generateToken(admin, password, Roles.Admin);

      req.body = { token };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

  getAllRestaurant = async (req: Request, res, next: NextFunction) => {
    try {
      const restaurants = await this.service.findAllRestaurant();
      req.body = { restaurants };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

  approveRestaurant = async (req: Request, res, next: NextFunction) => {
    const { id, status } = await Joi
      .object({
        id: Joi.string().trim().uuid().required().label('Restaurant ID'),
        status: Joi.bool().required().label('Status'),
      })
      .validateAsync({
        id: req.params.id,
        status: req.params.status,
      });
    try {
      const resp = await this.service.approveRestaurant({ id, status });
      req.body = { status: resp.status };
      next();
    } catch (err) {
      throw Boom.unauthorized(err);
    }
  };

}