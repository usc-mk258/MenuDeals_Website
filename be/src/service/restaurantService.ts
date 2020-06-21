import RestaurantRepo from '../respositories/restaurant';
import DealRepo from '../respositories/deal';
import OrderRepo from '../respositories/order';
import CustomerRepo from '../respositories/customer';
import { Service } from "typedi";
import * as Boom from '@hapi/boom';
import { OrderStatus } from '../entity/Order';
import notification from './notification';

@Service()
export class RestaurantService {

  async createRestaurant(payload) {
    let { email, name, password } = payload;
    const restaurant = await RestaurantRepo.findByEmail(email).catch(() => null);
    if (restaurant) {
      throw Boom.conflict('Restaurant with this email already exist');
    }
    return RestaurantRepo.create({ email, name, password: password });
  }

  async findRestaurantByEmail(payload) {
    let { email } = payload;
    const restaurant = await RestaurantRepo.findByEmail(email).catch(() => null);
    if (!restaurant) {
      throw Boom.conflict('Restaurant not found');
    }
    return restaurant;
  }

  async findRestaurantById(payload) {
    let { id } = payload;
    const restaurant = await RestaurantRepo.findById(id).catch(() => null);
    if (!restaurant) {
      throw Boom.conflict('Restaurant not found');
    }
    return restaurant;
  }

  async addInfoToRestaurant(payload) {
    let { id, description, latitude, longitude, image_url } = payload;

    const update = await RestaurantRepo.updateInfo(id, {
      description,
      latitude,
      longitude,
      image_url
    })
    return update;
  }

  async addDeal({ restaurant, description, price, image_url }) {
    const deal = await DealRepo.create({ id: restaurant.id, description, price, image_url });
    
    const customers = await CustomerRepo.findByLatLng({ 
      latitude: restaurant.point.coordinates[1], 
      longitude: restaurant.point.coordinates[0]
    });
    console.log('****************************');
    console.log(JSON.stringify(customers));
    console.log('****************************');
    customers.forEach(customer => {
      notification.send(`${restaurant.name} is offering a new Deal`, `${deal.description} for Price $${deal.price}`, customer.mobile_token);
    })

    return deal;
  }

  async getDeals(id: string) {
    return DealRepo.getDealsForRestaurant(id);
  }

  async getDeal(id: string, dealId: string) {
    const deal = DealRepo.getDealForRestaurant(id, dealId);
    if (!deal) {
      throw Boom.conflict('Deal not found');
    }
    return deal;
  }

  async getOrders(id: string) {
    return OrderRepo.findByRestaurantId(id);
  }

  async markOrder(restaurantId, id: string, status: boolean, eta?: string) {
    const order = await OrderRepo.findByRestaurantAndOrderId(restaurantId, id);
    if (!order) {
      throw Boom.conflict('Order not found for this restaurant');
    }
    return OrderRepo.changeStatus(id, (status || status === true) ? OrderStatus.ACCEPTED : OrderStatus.REJECTED, eta);
  }

  async getInfo(restaurantId) {
    const restaurant = await RestaurantRepo.findById(restaurantId);
    if (!restaurant) {
      throw Boom.conflict('Restaurant not found');
    }
    return restaurant;
  }

  async getReviews(restaurantId) {
    const restaurant = await RestaurantRepo.getReviews(restaurantId);
    if (!restaurant) {
      throw Boom.conflict('Restaurant not found');
    }
    return restaurant;
  }
}
