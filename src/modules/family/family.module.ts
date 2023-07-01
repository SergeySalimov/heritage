import { forwardRef, Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Family, FamilySchema } from './schemas/family.schema';
import { FamilyController } from './family.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Family.name, schema: FamilySchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [FamilyService],
  exports: [
    FamilyService
  ],
  controllers: [FamilyController],
})
export class FamilyModule {}
