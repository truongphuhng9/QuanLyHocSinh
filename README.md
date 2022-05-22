# Quản lý học sinh

## Description

Đây là đồ án quản lý học sinh

## Installation

### Node modules
```bash
$ npm install
```

### Postgres(Docker)
Create the ```docker.env``` file for your Postgres Database as the variables below:
```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=nestjs
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```
Then compose up your container with this command
```bash
$ docker-compose up
```

### Enviroments
```bash
.env
```
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=nestjs
PORT=5000
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
