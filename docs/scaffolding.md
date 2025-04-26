# Project Scaffolding

This document explains the folder structure and module organization of the NestJS GraphQL boilerplate.

## Directory Structure

```
src/
├── @generated/           # Auto-generated GraphQL types from Prisma schema
├── auth/                 # Authentication module
│   ├── decorators/       # Custom decorators (e.g., CurrentUser)
│   ├── guards/           # Authentication guards (e.g., GqlAuthGuard)
│   ├── resolvers/        # GraphQL resolvers for auth operations
│   │   └── dto/          # Data Transfer Objects for auth operations
│   └── services/         # Authentication services
├── common/               # Common module with shared functionality
│   └── services/         # Common services
├── core/                 # Core module with essential services
│   ├── resolvers/        # Core GraphQL resolvers
│   └── services/         # Core services (e.g., PrismaService)
├── user/                 # User module
│   ├── resolvers/        # GraphQL resolvers for user operations
│   │   └── dto/          # Data Transfer Objects for user operations
│   └── services/         # User-related services
├── app.module.ts         # Main application module
└── main.ts               # Application entry point

prisma/
├── schema.prisma         # Prisma schema definition
└── seeds/                # Database seed files
    ├── main.seed.ts      # Main seed orchestrator
    └── user.seed.ts      # User seed data

docs/                     # Project documentation
```

## Module Structure

### Core Module

The Core module contains essential services that are used across the application, such as:

- `PrismaService`: Handles database connections and operations using Prisma ORM

### Common Module

The Common module contains shared functionality and utilities:

- Configuration services
- Shared utilities and helpers

### Auth Module

The Auth module handles authentication and authorization:

- JWT authentication strategy
- Login resolver
- Authentication guards
- Current user decorator

### User Module

The User module handles user-related operations:

- User creation
- User queries
- User profile management

## Module Dependencies

The modules have the following dependency relationships:

- **Core Module**: No dependencies (foundational)
- **Common Module**: May depend on Core
- **Auth Module**: Depends on User and Core
- **User Module**: Depends on Core

## GraphQL Structure

The application uses code-first GraphQL with NestJS decorators:

- **Resolvers**: Handle GraphQL queries and mutations
- **Models**: Auto-generated from Prisma schema
- **DTOs**: Define input and output types for GraphQL operations

## Prisma Integration

Prisma is configured to:

- Use PostgreSQL as the database
- Generate GraphQL types automatically
- Use UUIDs for all entity IDs
- Provide a seeding mechanism for initial data
