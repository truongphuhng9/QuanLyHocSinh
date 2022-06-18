import { HttpException, HttpStatus, Injectable } from "@nestjs/common"; 
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./user.entity";
import CreateUserDto from './dto/create-user.dto';

@Injectable() 
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {

    }
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  async getById(id: number): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}