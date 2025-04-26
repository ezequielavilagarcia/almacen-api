# Style Guide

This document outlines the coding conventions and style guidelines for this NestJS GraphQL project.

## Naming Conventions

### Files and Directories

- Use **kebab-case** for all files and directories
- Use descriptive names that indicate the file's purpose
- Follow the pattern: `feature.type.ts`

Examples:

```
auth.module.ts
user.service.ts
create-user.input.ts
gql-auth.guard.ts
```

### Classes and Decorators

- Use **PascalCase** for all classes, interfaces, and decorators
- Use descriptive names that indicate the class's purpose
- Suffix classes according to their role

Examples:

```typescript
export class UserService {}
export class CreateUserInput {}
export class GqlAuthGuard {}
export class UserResolver {}
```

### Variables and Functions

- Use **camelCase** for variables, properties, and function names
- Use descriptive names that indicate the variable's purpose
- Boolean variables should have a prefix like `is`, `has`, or `should`

Examples:

```typescript
const userService: UserService;
const isActive: boolean;
function findUserById(id: string): User {}
```

## Code Organization

### Module Structure

Each module should be organized into subdirectories by type:

```
module/
├── resolvers/
│   └── dto/
├── services/
├── guards/
├── decorators/
└── module.ts
```

### Import Order

Organize imports in the following order, separated by blank lines:

1. Node.js built-in modules
2. External libraries and frameworks
3. Internal modules (absolute imports)
4. Internal modules (relative imports)

Example:

```typescript
import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';

import { AuthService } from './services/auth.service';
```

## Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples

```
feat(auth): add JWT authentication
fix(user): resolve issue with user creation
docs(readme): update installation instructions
style(lint): apply eslint rules
```

## Code Style

### General Guidelines

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multi-line objects and arrays
- Limit line length to 100 characters
- Use semicolons at the end of statements
- Use explicit type annotations for function parameters and return types

### TypeScript Best Practices

- Use interfaces for object shapes
- Use enums for fixed sets of values
- Use type guards for runtime type checking
- Avoid using `any` type
- Use readonly for immutable properties
- Use optional parameters and properties with `?` notation

### GraphQL Best Practices

- Use input types for mutations
- Use object types for query responses
- Use field resolvers for complex field resolution
- Document your schema with descriptions
- Use pagination for lists
- Handle errors appropriately

## ESLint and Prettier

This project uses ESLint and Prettier for code formatting and linting. The configuration is already set up in the project.

To manually run the linter:

```bash
yarn lint
```

To format code with Prettier:

```bash
yarn format
```

## Pre-commit Hooks

This project uses Husky and lint-staged to run linters and tests before commits. The configuration is already set up in the project.
