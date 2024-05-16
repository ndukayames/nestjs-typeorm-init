import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/shared/services/email-service/email.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private readonly emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async createAccount(dto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(dto.email);

    if (existingUser)
      throw new ConflictException('This email already signed up');

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    dto.password = hashedPassword;

    const newUser = await this.userService.create(dto);

    const authTokens = await this.tokenService.getAuthTokens(newUser);

    const verificationUrl = ` ${this.configService.get(
      'FRONTEND_URL',
    )}/verify-email?token=${authTokens.access_token}`;

    this.emailService
      .send({
        from: this.configService.get('EMAIL_FROM'),
        to: newUser.email,
        subject: 'Welcome - activate your account',
        body: `Welcome to our platform! To activate your account, please click on the link below:\n\n${verificationUrl}`,
      })
      .then(() => {
        this.logger.log('Verification Email sent to ' + newUser.email);
      })
      .catch((error) => {
        this.logger.error('Error sending email', error);
      });

    return 'Signup successful, please check your email for verification link';
  }
}
