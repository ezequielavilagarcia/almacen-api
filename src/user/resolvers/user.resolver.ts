import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../@generated/user/user.model';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { UserService } from '../services/user.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);

    if (user == null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }
}
