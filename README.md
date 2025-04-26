# NestJS GraphQL Boilerplate

A professional, production-ready NestJS boilerplate with GraphQL, Prisma, PostgreSQL, and JWT authentication.

## Features

- **NestJS**: Latest version with modular architecture
- **GraphQL API**: Apollo Server with code-first approach
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication with Passport.js
- **Validation**: Request validation using class-validator
- **Documentation**: Comprehensive documentation in the `/docs` folder
- **Docker**: Containerized setup with Docker and Docker Compose
- **Code Quality**: ESLint, Prettier, Husky, and lint-staged
- **Testing**: Jest configuration ready for unit and e2e tests

## Tech Stack

- NestJS
- GraphQL with Apollo Server
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- JWT Authentication
- TypeScript

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nestjs-graphql-boilerplate
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the Docker containers:

```bash
docker-compose up --build
```

5. Run database migrations:

```bash
yarn migrate
```

6. Seed the database:

```bash
yarn seed
```

7. Start the development server:

```bash
yarn start:dev
```

## Access Points

- **GraphQL API**: http://localhost:3000/graphql
- **pgAdmin**: http://localhost:5050
  - Email: admin@admin.com
  - Password: admin

## Project Structure

```
src/
├── @generated/           # Auto-generated GraphQL types from Prisma schema
├── auth/                 # Authentication module
├── common/               # Common module with shared functionality
├── core/                 # Core module with essential services
├── user/                 # User module
├── app.module.ts         # Main application module
└── main.ts               # Application entry point

prisma/                   # Prisma configuration and migrations
└── seeds/                # Database seed files

docs/                     # Project documentation
```

## Documentation

Detailed documentation is available in the `/docs` folder:

- [How to Start the Local Environment](./docs/how-to-start-local-environment.md)
- [Project Scaffolding](./docs/scaffolding.md)
- [How to Handle Environment Variables](./docs/how-to-handle-env-variables.md)
- [How to Validate Requests](./docs/how-to-validate-request.md)
- [Layer Responsibilities](./docs/layers-responsibilities.md)
- [Style Guide](./docs/style-guide.md)

## Scripts

- `yarn start:dev` - Start the application in development mode
- `yarn build` - Build the application
- `yarn start:prod` - Start the application in production mode
- `yarn migrate` - Run Prisma migrations
- `yarn generate` - Generate Prisma client
- `yarn seed` - Seed the database
- `yarn lint` - Run ESLint
- `yarn format` - Run Prettier
- `yarn test` - Run tests

## License

[MIT](LICENSE)
