import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { FamilyModule } from '../family/family.module';
import * as process from 'process';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => FamilyModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'Secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
