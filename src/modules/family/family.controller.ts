import { Controller, Delete, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { FamilyService } from './family.service';
import { ROUTE_PREFIX } from '../../core/constants/routes';
import { ObjectId } from 'mongoose';
import { Family } from './schemas/family.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Controller(`${ROUTE_PREFIX}/family`)
export class FamilyController {
  constructor(private familyService: FamilyService) {}

  @ApiOperation({ summary: 'Get initial family user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Family })
  @UseGuards(JwtAuthGuard)
  @Get(':userId/byUserId')
  async getByUserId(@Param('userId') userId: ObjectId): Promise<Family> {
    return this.familyService.findByUserId(userId);
  }


  // TODO should be removed aka Test method
  @Get()
  async getAll() {
    return this.familyService.findAll();
  }

  // TODO should be removed aka Test method
  @Get(':id')
  async getById(@Param('id') id: ObjectId) {
    return this.familyService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: ObjectId) {
    return this.familyService.remove(id);
  }
}
