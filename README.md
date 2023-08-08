# nestjs-prisma-starter

## Description

Starter template for [NestJS](https://github.com/nestjs/nest) and [Prisma](https://www.prisma.io/).

## Development environment

- ... have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

- ... have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/#compose-installation-scenarios) installed. If you are using Linux, please make sure your Docker version is 20.10.0 or higher. You can check your Docker version by running docker version in the terminal.

- ... optionally have the [Prisma VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) installed. The Prisma VS Code extension adds some really nice IntelliSense and syntax highlighting for Prisma.

- ... optionally have access to a Unix shell (like the terminal/shell in Linux and macOS) to run the commands provided in this series.

## Running the app

1. Install dependencies:

   ```bash
   $ pnpm install
   ```

2. Start the PostgreSQL database with Docker:

   ```bash
   $ pnpm run docker:db
   ```

3. Apply database migrations:

   ```bash
   $ pnpm run prisma:migrate
   ```

4. Start NestJS Server:

   ```bash
   # development
   $ pnpm run start

   # watch mode
   $ pnpm run start:dev

   # production mode
   $ pnpm run start:prod
   ```

## Rest Api

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
