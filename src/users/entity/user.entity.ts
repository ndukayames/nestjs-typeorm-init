import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['personal', 'business'] })
  accountType: AccountType;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isAccountVerified: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isPhoneNumberVerified: boolean;

  @Column({ default: false })
  isPasswordReset: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordResetAt: Date;
}

export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}
