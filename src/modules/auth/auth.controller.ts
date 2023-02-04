import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, UserDto } from '../user/schemas/user';
import { AuthService } from './auth.service';
import { TokenDto } from './schemas/auth';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { ROUTE_PREFIX } from '../../core/constants/routes';

@ApiTags('Authentication')
@Controller(`${ROUTE_PREFIX}/auth`)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: TokenDto })
  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<TokenDto> {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, type: TokenDto })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: UserDto): Promise<TokenDto> {
    return this.authService.registration(userDto);
  }
}
