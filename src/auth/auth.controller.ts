import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccountType } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('personal/signup')
  createPersonalAccount(@Body() dto: CreateUserDto) {
    dto.userType = AccountType.PERSONAL;
    dto.businessName = null;
    return this.authService.createAccount(dto);
  }

  @Post('business/signup')
  createBusinessAccount(@Body() dto: CreateUserDto) {
    dto.userType = AccountType.BUSINESS;
    if (!dto.businessName) {
      throw new BadRequestException(
        'Business name is required for business accounts',
      );
    }
    return this.authService.createAccount(dto);
  }
}
