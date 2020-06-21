import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Admin } from "../../src/entity/Admin";

export class AddAdminUser1588452512795 implements MigrationInterface {

    public async up(): Promise<void> {
        const admin = getRepository(Admin).create({
            email: 'admin@app.com',
            password: 'helloworld',
        });

        await getRepository(Admin).save(admin);
    }

    public async down(): Promise<void> {
        const admin = await getRepository(Admin).findOne({
            where: { email: 'admin@app.com' },
        });

        await getRepository(Admin).remove(admin);
    }

}
