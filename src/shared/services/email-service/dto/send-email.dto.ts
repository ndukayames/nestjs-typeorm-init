import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SendEmail {
  @IsString()
  to: string;
  @IsString()
  from: string;
  @IsString()
  subject: string;
  @IsString()
  body: string;
  @IsOptional()
  @IsString()
  cc?: string;
  @IsOptional()
  @IsString()
  bcc?: string;
}
