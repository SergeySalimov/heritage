import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto, LoginUserDto } from '../user/schemas/user';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/schemas/user.schema';
import { TokenDto } from './schemas/auth';
import { FamilyService } from "../family/family.service";
import { FamilyUtils } from "../../core/utils/family.utils";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private familyService: FamilyService,
  ) {}

  async login(userDto: LoginUserDto): Promise<TokenDto> {
    const user: User = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: UserDto): Promise<TokenDto> {
    const candidate: User = await this.userService.getUsersByEmail(userDto.email);

    if(candidate) {
      throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const hashPassword = await bcrypt.hash(userDto.password, 5); // TODO replace on SALT const
      const user: User = await this.userService.create({ ...userDto, password: hashPassword });

      await this.familyService.create(FamilyUtils.mapUserToFamily(userDto, user.id));

      return this.generateToken(user);
    }
    catch (e) {
      throw new HttpException('Not correct data', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  private async generateToken(user: User): Promise<TokenDto> {
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload),
      id: user.id,
    }
  }

  private async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user: User = await this.userService.getUsersByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Email is incorrect', statusCode: HttpStatus.UNAUTHORIZED });
    }

    const isPasswordsEqual: boolean = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordsEqual) {
      throw new UnauthorizedException({ message: 'Password is incorrect', statusCode: HttpStatus.UNAUTHORIZED });
    }

    return user;
  }
}
