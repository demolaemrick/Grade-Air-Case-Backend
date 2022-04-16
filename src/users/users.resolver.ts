import { Int } from '@nestjs/graphql';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  //    CREATE USER
  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  //    READ USER
  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //    UPDATE USER
  @Mutation((returns) => User)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserInput);
  }

  //   DELETE USER
  @Mutation((returns) => User)
  deleteUser(@Args('id', {type: () => Int}) id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
