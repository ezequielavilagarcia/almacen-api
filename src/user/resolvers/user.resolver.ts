import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../../@generated/company/company.model';
import { User } from '../../@generated/user/user.model';
import { CreateUserInput } from '../dtos/create-user.input';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
  ) {}

  @ResolveField('Company', () => Company)
  async getCompany(@Parent() user: User): Promise<Company> {
    const companyId = user.companyId;

    return this.companyService.findById(companyId);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }
}
