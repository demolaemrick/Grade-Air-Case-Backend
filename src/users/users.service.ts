import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //    CREATE USER
  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = await this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  //    READ USER
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  //   READ USER BY ID
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  //    UPDATE USER
  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const userToUpdate = await this.userRepository.findOneOrFail(
      updateUserInput.id,
    );
    return this.userRepository.save({ ...userToUpdate, ...updateUserInput });
  }

  //   DELETE USER
  async delete(id: string): Promise<User> {
    const userToDelete = await this.userRepository.findOneOrFail(id);
    return this.userRepository.remove(userToDelete);
  }
}
