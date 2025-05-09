# How to Start the Local Environment

This document explains how to set up and run the project in your local development environment.

## Prerequisites

- Node.js v22.15.0 (recommended to use nvm to manage the version)
- Yarn
- Docker and Docker Compose
- Git

### Node Version Manager (nvm)

This project uses an `.nvmrc` file to specify the exact Node.js version required. If you have nvm installed, simply run:

```bash
nvm use
```

This will automatically switch to the Node.js version specified in the `.nvmrc` file (v22.15.0).

If you don't have nvm installed, you can install it by following the instructions at [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).

## Steps to Start the Local Environment

### 1. Install Dependencies

```bash
yarn install
```

### 2. Configure Environment Variables

Copy the environment variables example file and configure it according to your needs:

```bash
cp .env.example .env
```

Make sure the database URL and JWT keys are properly configured.

### 3. Start the Infrastructure with Docker

```bash
docker compose up --build -d
```

This will start:

- PostgreSQL on port 5432
- pgAdmin on port 5050 (accessible at http://localhost:5050)
- The NestJS application on port 3000

### 4. Run Database Migrations

In a new terminal, run:

```bash
yarn migrate
```

### 5. Populate the Database with Initial Data

```bash
yarn seed
```

### 6. Start the Application in Development Mode

If you're not running the application through Docker and prefer to run it locally for development:

```bash
yarn start:dev
```

## Access Points

- **GraphQL API**: http://localhost:3000/graphql
- **pgAdmin**: http://localhost:5050
  - Email: admin@admin.com
  - Password: admin

## Common Troubleshooting

### Database Connection Error

Make sure PostgreSQL is running and that the database URL in the `.env` file is correct.

### Migration Errors

If you encounter errors when running migrations, try:

```bash
yarn prisma migrate reset --force
```

This will drop the database and recreate it from scratch.

### Docker Issues

If you encounter issues with Docker, try:

```bash
docker-compose down -v
docker-compose up --build
```

This will remove the volumes and rebuild the containers.
