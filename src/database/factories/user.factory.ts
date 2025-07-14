import { setSeederFactory } from 'typeorm-extension';

import { User } from '~/database/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = new User();
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email({ firstName, lastName }).toLowerCase();
  user.password = 'password';

  return user;
});
