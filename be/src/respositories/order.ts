import { Order, OrderStatus } from './../entity/Order';
import { Repository, getConnection } from 'typeorm';

class Repo {
  private repo: Repository<Order>;

  constructor() {
    this.repo = getConnection().getRepository(Order);
  }

  public create({ customerId, dealId }): Promise<Order> {
    const order = this.repo.create({ customer: customerId, deal: dealId });

    return this.repo.save(order);
  }

  public findByRestaurantId(id: string): Promise<Order[]> {
    const orders = this.repo.createQueryBuilder('order')
      .leftJoin('deal', 'deal', '"order"."dealId" = deal.id')
      .leftJoin('restaurant', 'restaurant', 'restaurant.id = "deal"."restaurantId"')
      .where('restaurant.id = :restaurantId', { restaurantId: id })
      .getMany();

    return orders;
  }

  public findByRestaurantAndOrderId(restaurantId: string, orderId: string): Promise<Order> {
    const order = this.repo.createQueryBuilder('order')
      .leftJoin('deal', 'deal', '"order"."dealId" = deal.id')
      .leftJoin('restaurant', 'restaurant', 'restaurant.id = "deal"."restaurantId"')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .where('order.id = :orderId', { orderId })
      .getOne();

    return order;
  }

  public changeStatus(id: string, status: OrderStatus, eta?): Promise<Order> {
    return this.repo.save({
      id: id, status, eta
    })
  }

  public findByCustomerId(id: string): Promise<Order[]> {
    return this.repo.find({
      customer: { id }
    });
  }

  public findByCustomerAndOrderId(customerId: string, orderId: string): Promise<Order> {
    return this.repo.findOne({
      where: {
        customer: { id: customerId },
        id: orderId
      },
    });
  }

}

export default new Repo();
