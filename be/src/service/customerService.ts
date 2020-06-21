import CustomerRepo from '../respositories/customer';
import RestaurantRepo from '../respositories/restaurant';
import DealRepo from '../respositories/deal';
import OrderRepo from '../respositories/order';
import ReviewRepo from '../respositories/review';
import { Service } from "typedi";
import * as Boom from '@hapi/boom';
import { OrderStatus } from '../entity/Order';


@Service()
export class CustomerService {

  async createCustomer(payload) {
    let { email, name, password } = payload;
    const customer = await CustomerRepo.findByEmail(email).catch(() => null);
    if (customer) {
      throw Boom.conflict('Customer with this email already exist');
    }
    return await CustomerRepo.create({ email, name, password: password });
  }

  async findCustomerByEmail(payload) {
    let { email } = payload;
    const customer = await CustomerRepo.findByEmail(email).catch(() => null);
    if (!customer) {
      throw Boom.conflict('Customer not found');
    }
    return customer;
  }

  async findCustomerById(payload) {
    let { id } = payload;
    const customer = await CustomerRepo.findById(id).catch(() => null);
    if (!customer) {
      throw Boom.conflict('Customer not found');
    }
    return customer;
  }

  async findRestaurantsByLatLng({ latitude, longitude }) {
    const restaurants = await RestaurantRepo.findByLatLng({ latitude, longitude });
    if (!restaurants || restaurants.length < 1) {
      throw Boom.conflict('Restaurants not found');
    }
    return restaurants.map(rest => ({ id: rest.id, name: rest.name, email: rest.email, image_url: rest.image_url, address: rest.point, description: rest.description }));
  }

  async placeOrder({ customerId, dealId }) {
    const deal = await DealRepo.findById(dealId);
    if (!deal) {
      throw Boom.conflict('Deal not found');
    }
    const order = await OrderRepo.create({ customerId, dealId });

    return order.id;

  }

  async getAllOrders({ customerId }) {
    return OrderRepo.findByCustomerId(customerId);
  }

  async markOrderReceived(customerId, orderId) {
    const order = await OrderRepo.findByCustomerAndOrderId(customerId, orderId);
    if (!order) {
      throw Boom.conflict('Order not found for this user');
    }
    return OrderRepo.changeStatus(orderId, OrderStatus.RECEIVED);
  }

  async getDeals(id: string) {
    return DealRepo.getDealsForRestaurant(id);
  }

  async postReview(restaurantId: string, rating: number, description: string) {
    const restaurant = await RestaurantRepo.findById(restaurantId);
    if (!restaurant) {
      throw Boom.conflict('Restaurant not found');
    }

    return ReviewRepo.create({
      restaurantId: restaurant.id,
      rating,
      description
    });

  }

  async getRestaurantReviews(restaurantId: string) {
    const restaurant = await RestaurantRepo.findById(restaurantId);
    if (!restaurant) {
      throw Boom.conflict('Restaurant not found');
    }
    return RestaurantRepo.getReviews(restaurantId);
  }

  async updateLocation({ latitude, longitude, id }) {
    return CustomerRepo.updateLocation({ latitude, longitude }, id);
  }

  async saveToken(mobile_token, id) {
    return CustomerRepo.saveToken({ mobile_token }, id)
  }
}
