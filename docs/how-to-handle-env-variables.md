# How to Handle Environment Variables

This document explains how environment variables are managed and validated in this NestJS application.

## Environment Variables Configuration

The application uses `@nestjs/config` and `joi` for loading and validating environment variables.

### Configuration Setup

The environment variables are loaded and validated in the `app.module.ts` file:

```typescript
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().default('1d'),
      }),
    }),
    // Other imports...
  ],
})
export class AppModule {}
```

## Required Environment Variables

The following environment variables are required:

| Variable         | Description                         | Default       | Required |
| ---------------- | ----------------------------------- | ------------- | -------- |
| `NODE_ENV`       | Application environment             | `development` | No       |
| `PORT`           | Port on which the application runs  | `3000`        | No       |
| `DATABASE_URL`   | PostgreSQL connection string        | -             | Yes      |
| `JWT_SECRET`     | Secret key for JWT token generation | -             | Yes      |
| `JWT_EXPIRATION` | JWT token expiration time           | `1d`          | No       |

## Environment Files

The application uses the following environment files:

- `.env`: Main environment file for local development
- `.env.example`: Example environment file with placeholder values (committed to the repository)
- `.env.test`: Environment variables for testing
- `.env.production`: Environment variables for production (should be set in the deployment environment)

## Accessing Environment Variables

Environment variables can be accessed in your services using the `ConfigService`:

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  someMethod() {
    // Access environment variables
    const port = this.configService.get<number>('PORT');
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    // You can provide a default value as a second parameter
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
  }
}
```

## Best Practices

1. **Never hardcode sensitive information** like API keys or database credentials
2. **Always validate** environment variables at application startup
3. **Provide sensible defaults** for non-critical variables
4. **Document all environment variables** required by the application
5. **Use different environment files** for different environments
6. **Never commit sensitive environment files** to the repository (use `.gitignore`)
7. **Use type safety** when accessing environment variables with TypeScript generics
