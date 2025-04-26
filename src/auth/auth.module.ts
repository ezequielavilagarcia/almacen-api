import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategy } from './services/jwt.strategy';
import { UserModule } from '../user/user.module';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION'),
        },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
  exports: [GqlAuthGuard, JwtStrategy, PassportModule],
})
export class AuthModule {}
