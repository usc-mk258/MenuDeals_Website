import { Repository, getConnection } from 'typeorm';
import { Deal } from '../entity/Deal';

class Repo {
  private repo: Repository<Deal>;

  constructor() {
    this.repo = getConnection().getRepository(Deal);
  }

  public create({ id, description, price, image_url }): Promise<Deal> {
    const deal = this.repo.create({ description, price, restaurant: id, image_url });

    return this.repo.save(deal);
  }

  public findById(id: string): Promise<Deal> {
    return this.repo.findOne({
      where: [
        { id },
      ],
    });

  }

  public getDealsForRestaurant(restaurantId: string): Promise<Deal[]> {
    return this.repo.find({
      restaurant: { id: restaurantId }
    });

  }

  public getDealForRestaurant(restaurantId: string, dealId: string): Promise<Deal[]> {
    return this.repo.find({
      restaurant: { id: restaurantId },
      id: dealId
    });

  }

}

export default new Repo();
