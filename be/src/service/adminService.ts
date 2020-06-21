import AdminRepo from '../respositories/admin';
import RestaurantRepo from '../respositories/restaurant';
import { Service } from "typedi";
import * as Boom from '@hapi/boom';


@Service()
export class AdminService {

  async findAdminByEmail(payload) {
    let { email } = payload;
    const admin = await AdminRepo.findByEmail(email).catch(() => null);
    if (!admin) {
      throw Boom.conflict('admin not found');
    }
    return admin;
  }

  findAllRestaurant() {
    return RestaurantRepo.getAll();
  }

  async findAdminById(payload) {
    let { id } = payload;
    const admin = await AdminRepo.findById(id).catch(() => null);
    if (!admin) {
      throw Boom.conflict('Admin not found');
    }
    return admin;
  }

  async approveRestaurant(params) {
    const { id, status } = params;
    const restaurant = await RestaurantRepo.findById(id).catch(() => null);
    if (!restaurant) {
      throw Boom.conflict('Restaurant not found');
    }

    const update = await RestaurantRepo.updateStatus(id, status)
    return update;

  }
}
