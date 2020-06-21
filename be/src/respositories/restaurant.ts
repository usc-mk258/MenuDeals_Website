import { Restaurant } from './../entity/Restaurant';
import { EntityRepository, getManager, AbstractRepository, Repository, getConnection } from 'typeorm';

class Repo {
	private repo: Repository<Restaurant>;

	constructor() {
		this.repo = getConnection().getRepository(Restaurant);
	}


	public async create({ email, name, password }): Promise<Restaurant> {
		const restaurant = this.repo.create({ email, name, password });

		return this.repo.save(restaurant);
	}

	public findByEmail(email: string): Promise<Restaurant> {
		return this.repo.findOne({
			where: [
				{ email },
			],
		});

	}


	async findById(restaurantId: string): Promise<Restaurant> {
		return this.repo.findOne({
			where: [
				{ id: restaurantId },
			],
		});
	}

	async updateInfo(restaurantId: string, payload): Promise<any> {

		return this.repo.save({
			id: restaurantId, ...payload, point: {
				type: 'Point',
				coordinates: [payload.longitude, payload.latitude]
			}
		})
	}

	async updateStatus(restaurantId: string, status: boolean): Promise<any> {

		return this.repo.save({ id: restaurantId, status: status })
	}

	async getAll(): Promise<any> {

		return this.repo.findAndCount();
	}

	async findByLatLng({ latitude, longitude }) {
		return this.repo.createQueryBuilder('restaurant')
			.where(`ST_Distance(Restaurant.point, ST_GeogFromText('point(${longitude} ${latitude})')) < 1000`)
			.getMany();
	}

	async getReviews(id: string){
		return this.repo.createQueryBuilder('restaurant')
			.leftJoin('reviews', 'reviews', '"restaurant"."id" = "reviews"."restaurantId"')
			.leftJoinAndMapMany('restaurant.reviews', 'reviews', 'reviews1', '"restaurant"."id" = "reviews1"."restaurantId"')
			.where('restaurant.id = :restaurantId', { restaurantId: id })
			.getOne()
	}


}

export default new Repo();
