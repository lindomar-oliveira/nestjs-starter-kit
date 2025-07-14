import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from '~/database/entities';
import { repositories } from '~/database/repositories';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  providers: [...repositories],
  exports: [...repositories]
})
export class RepositoriesModule {}
