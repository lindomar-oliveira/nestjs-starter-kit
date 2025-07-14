import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { z } from 'zod';

import { envSchema } from '~/config/config.module';

type Env = z.infer<typeof envSchema>;

@Injectable()
export class ConfigService extends NestConfigService<Env, true> {
  public get<T extends keyof Env>(key: T, defaultValue?: Env[T]): Env[T] {
    return super.get(key, defaultValue as Env[T], { infer: true });
  }
}
