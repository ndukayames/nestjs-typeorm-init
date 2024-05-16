import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountType, User } from 'src/users/entity/user.entity';

export enum TokenType {
  ACCESS,
  REFRESH,
  PASWSWORD_RESET,
}
@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: User, tokenType: TokenType, userType: AccountType) {
    const payload = {
      sub: user.id,
      userRole: userType === null ? AccountType.PERSONAL : userType,
      tokenType,
    };

    return await this.jwtService.signAsync(payload);
  }

  async getAuthTokens(user: User) {
    const accessToken = await this.generateToken(
      user,
      TokenType.ACCESS,
      user.accountType,
    );
    const refreshToken = await this.generateToken(
      user,
      TokenType.REFRESH,
      user.accountType,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getPasswordResetToken(user: User) {
    const token = await this.generateToken(
      user,
      TokenType.PASWSWORD_RESET,
      user.accountType,
    );

    return token;
  }

  async decodeToken(token: string) {
    const decoded = this.jwtService.decode(token);
    return decoded;
  }
}
