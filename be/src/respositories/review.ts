import { Repository, getConnection } from 'typeorm';
import { Review } from '../entity/Reviews';

class Repo {
  private repo: Repository<Review>;

  constructor() {
    this.repo = getConnection().getRepository(Review);
  }

  public create({ restaurantId, rating, description }): Promise<Review> {
    const review = this.repo.create({ restaurant: restaurantId, rating, description });

    return this.repo.save(review);
  }
}

export default new Repo();
