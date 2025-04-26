import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInput } from './dto/login-input.dto';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../../@generated/user/user.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<LoginResponse> {
    const user = await this.authService.validateUser(loginInput.email, loginInput.password);
    return this.authService.login(user);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return user;
  }
}
