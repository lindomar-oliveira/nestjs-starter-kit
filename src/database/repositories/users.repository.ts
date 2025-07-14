import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from '~/database/entities/user.entity';
import { BaseRepository } from '~/database/repositories/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(protected readonly dataSource: DataSource) {
    super(User, dataSource);
  }
}
