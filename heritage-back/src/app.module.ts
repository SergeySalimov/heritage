import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/usersModule';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_PATH),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
