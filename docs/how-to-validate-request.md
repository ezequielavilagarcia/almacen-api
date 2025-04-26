# How to Validate Requests

This document explains how to validate incoming requests in this NestJS GraphQL application.

## Validation in GraphQL

In GraphQL applications, validation is primarily handled through Input Types (DTOs) and class-validator decorators.

### Setting Up Validation

The application is already configured to use validation pipes globally in `main.ts`:

```typescript
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

## Using Class Validator with GraphQL

### Creating Input DTOs

Input DTOs are used to validate incoming data in mutations and queries:

```typescript
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;
}
```

### Using Input DTOs in Resolvers

The input DTOs are then used in resolvers to validate incoming data:

```typescript
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from '../../@generated/user/user.model';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }
}
```

## Common Validation Decorators

Here are some commonly used validation decorators from class-validator:

| Decorator         | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `@IsNotEmpty()`   | Checks if the value is not empty                     |
| `@IsEmail()`      | Validates that the string is an email                |
| `@MinLength(n)`   | Checks if the string length is at least n characters |
| `@MaxLength(n)`   | Checks if the string length is at most n characters  |
| `@IsOptional()`   | Marks the property as optional                       |
| `@IsNumber()`     | Checks if the value is a number                      |
| `@IsString()`     | Checks if the value is a string                      |
| `@IsBoolean()`    | Checks if the value is a boolean                     |
| `@IsDate()`       | Checks if the value is a date                        |
| `@IsUUID()`       | Checks if the value is a UUID                        |
| `@IsEnum(enum)`   | Checks if the value is in the specified enum         |
| `@Min(n)`         | Checks if the value is at least n                    |
| `@Max(n)`         | Checks if the value is at most n                     |
| `@Matches(regex)` | Checks if the string matches the regex               |

## Custom Validation

### Custom Validation Decorators

You can create custom validation decorators:

```typescript
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordStrong',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        },
      },
    });
  };
}
```

### Using Custom Validation

Then use it in your DTOs:

```typescript
@InputType()
export class CreateUserInput {
  // Other fields...

  @Field()
  @IsNotEmpty()
  @IsPasswordStrong()
  password: string;
}
```

## Error Handling

Validation errors are automatically handled by NestJS and returned as GraphQL errors. The error response will include details about which fields failed validation and why.
