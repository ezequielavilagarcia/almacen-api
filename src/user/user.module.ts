import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { UserResolver } from './resolvers/user.resolver';
import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';

@Module({
  imports: [CoreModule],
  providers: [UserService, CompanyService, UserResolver],
  exports: [UserService, CompanyService],
})
export class UserModule {}
