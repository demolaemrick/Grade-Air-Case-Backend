import { Int } from '@nestjs/graphql';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  //    CREATE USER
  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  //    READ USER
  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //    UPDATE USER
  @Mutation((returns) => User)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true })) //allows me to update the user without having to pass all the fields
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput);
  }

  //   DELETE USER
  @Mutation((returns) => User)
  deleteUser(@Args('id', {type: () => Int}) id: number): Promise<User> {
    return this.usersService.delete(id);
  }
}
