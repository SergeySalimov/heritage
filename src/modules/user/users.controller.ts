import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UserDto } from './schemas/user';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { ROUTE_PREFIX } from '../../core/constants/routes';

@ApiTags('Users')
@Controller(`${ROUTE_PREFIX}/users`)
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}

