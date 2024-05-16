import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.email = createUserDto.email;
    newUser.phoneNumber = createUserDto.phoneNumber;
    newUser.password = createUserDto.password;
    newUser.accountType = createUserDto.userType;
    newUser.businessName = createUserDto.businessName;

    return await this.usersRepository.save(newUser);
  }

  async findUserById(sub: string) {
    return new User();
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
