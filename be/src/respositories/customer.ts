import { Customer } from './../entity/Customer';
import { Repository, getConnection } from 'typeorm';

class Repo {
  private repo: Repository<Customer>;

  constructor() {
    this.repo = getConnection().getRepository(Customer);
  }


  public async create({ email, name, password }): Promise<Customer> {
    const customer = this.repo.create({ email, name, password });

    return this.repo.save(customer);
  }

  public findByEmail(email: string): Promise<Customer> {
    return this.repo.findOne({
      where: [
        { email },
      ],
    });

  }

  public findById(id: string): Promise<Customer> {
    return this.repo.findOne({
      where: [
        { id },
      ],
    });

  }

  public updateLocation(payload, id: string): any {
    return this.repo.save({
			id: id, ...payload, point: {
				type: 'Point',
				coordinates: [payload.longitude, payload.latitude]
			}
		})
  }

  public saveToken(payload, id): any {
    return this.repo.save({
			id: id, ...payload, mobile_token: payload.mobile_token
		})
  }


	async findByLatLng({ latitude, longitude }) {
		return this.repo.createQueryBuilder('customer')
			.where(`ST_Distance(customer.point, ST_GeogFromText('point(${longitude} ${latitude})')) < 1000`)
			.getMany();
	}

}

export default new Repo();
