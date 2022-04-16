import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //    CREATE USER
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = await this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  //    READ USER
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  //   READ USER BY ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  //    UPDATE USER
  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const userToUpdate = await this.userRepository.findOneOrFail(
      updateUserInput.id,
    );
    return this.userRepository.save({ ...userToUpdate, ...updateUserInput });
  }

  //   DELETE USER
  async deleteUser(id: number): Promise<User> {
    const userToDelete = await this.userRepository.findOneOrFail(id);
    return this.userRepository.remove(userToDelete);
  }
}
