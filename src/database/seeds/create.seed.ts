import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../models/users/user.entity';
import { Address } from '../../models/address/address.entity';

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userRepository = await getRepository(User);
    const addressRepository = await getRepository(Address);

    const users = [
      {
        username: 'glovory',
        password: 'GlovoryPassword',
        email: 'job@glovory.com',
        name: 'Glovory Job Portal',
        address: [
          { address: 'Victory Street 27', city: 'Malang' },
          { address: 'Awesome Street 99', city: 'Riyadh' },
        ],
      },
      {
        username: 'backend',
        password: 'BackendPassword',
        email: 'backend@glovory.com',
        name: 'Glovory Backend Team',
      },
    ];

    for (let index = 0; index < users.length; index++) {
      const userSeeder = users[index];
      const findUser = await userRepository.findOne({
        username: userSeeder.username,
      });

      if (findUser) {
        continue;
      }

      const user: User = new User();
      user.username = userSeeder.username;
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(userSeeder.password, user.salt);
      user.email = userSeeder.email;
      user.name = userSeeder.name;

      const savedUser = await userRepository.save(user);

      if (!userSeeder.hasOwnProperty('address')) {
        continue;
      }

      // Seed address if exist
      userSeeder.address.forEach(async (el) => {
        const address: Address = new Address();
        address.user_id = savedUser;
        address.address = el.address;
        address.city = el.city;

        await addressRepository.save(address);
      });
    }
  }
}
