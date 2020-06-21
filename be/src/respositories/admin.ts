import { Admin } from './../entity/Admin';
import { Repository, getConnection } from 'typeorm';

class Repo {
  private repo: Repository<Admin>;

  constructor() {
    this.repo = getConnection().getRepository(Admin);
  }

  public findByEmail(email: string): Promise<Admin> {
    return this.repo.findOne({
      where: [
        { email },
      ],
    });

  }

  public findById(id: string): Promise<Admin> {
    return this.repo.findOne({
      where: [
        { id },
      ],
    });

  }
}

export default new Repo();
