import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';

const envSchema = z.object({});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validate: (env) => envSchema.parse(env)
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
