import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Family, FamilyDocument } from './schemas/family.schema';
import { Model, ObjectId } from 'mongoose';
import { FamilyDto } from './schemas/family';

@Injectable()
export class FamilyService {
  constructor(@InjectModel(Family.name) private familyModel: Model<FamilyDocument>) {}

  async create(dto: FamilyDto): Promise<Family> {
    const createdFamily = new this.familyModel(dto);

    return createdFamily.save();
  }

  async findByUserId(userId: ObjectId): Promise<Family> {
    return this.familyModel.findOne({ userId });
  }

  async findAll(): Promise<Family[]> {
    return this.familyModel.find().exec();
  }

  async findById(id: ObjectId): Promise<Family> {
    return this.familyModel.findById(id);
  }

  async remove(id: ObjectId): Promise<Family> {
    return this.familyModel.findByIdAndRemove(id);
  }

  async update(id: ObjectId, dto: FamilyDto): Promise<Family> {
    return this.familyModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
