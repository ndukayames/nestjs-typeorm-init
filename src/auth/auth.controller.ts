import { Body, Controller, Post } from '@nestjs/common';
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
    return this.authService.createPersonalAccount(dto);
  }
}
