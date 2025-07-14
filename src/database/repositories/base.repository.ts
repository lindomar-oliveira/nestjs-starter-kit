import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepository<
  T extends ObjectLiteral
> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    const repository = dataSource.getRepository(target);
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
