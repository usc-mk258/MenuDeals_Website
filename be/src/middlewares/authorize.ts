import { AdminService } from './../service/adminService';
import * as Boom from '@hapi/boom';
import * as express from 'express';

import { verifyToken } from '../service/token';
import { RestaurantService } from '../service/restaurantService';
import { CustomerService } from '../service/customerService';
import { Roles } from '../routes/roles';

export function authorize(role: Roles): express.RequestHandler {
    return async (req: any, res: express.Response, next: express.NextFunction): Promise<void> => {
        // token verification
        let service;
        let token: string | null = null;
        const authheader = (req.headers.authorization || '').split(' ');
        if (authheader.length === 2 && authheader[0].toLowerCase() === 'bearer') {
            token = authheader[1];
        }

        if (!token) {
            return next(Boom.unauthorized('Token required'));
        }

        try {
            const claims = verifyToken(token);
            if (role === Roles.Restaurant) {
                service = new RestaurantService();
                const restaurant = await service.findRestaurantById({ id: claims.id });

                req.restaurant = restaurant;
            } else if (role === Roles.Admin) {
                service = new AdminService();
                const admin = await service.findAdminById({ id: claims.id });

                req.admin = admin;
            } else if (role === Roles.Client) {
                service = new CustomerService();
                const customer = await service.findCustomerById({ id: claims.id });
                req.customer = customer;
            }
        } catch (err) {
            return next(Boom.unauthorized('This token is unauthorized'));
        }

        return next();
    };
}
