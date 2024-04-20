import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailAttachments {
  @IsNotEmpty()
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
  @IsArray()
  attachments: Express.Multer.File[];
}
