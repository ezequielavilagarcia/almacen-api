import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
