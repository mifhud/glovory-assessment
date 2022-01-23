## Description

**Glovory Assessment**

- Name : Miftahul Huda
- Email : miftahulxhuda@gmail.com
- Why Glovory should accept you?  
  Answer : I can see that, in this role, my skills could help solve this problem within your company. I also see an opportunity for me to learn and grow these skills

## Installation

**Install packages**

```bash
$ npm install
```

## Setup configuration environment

**default.yml**

- Create file default.yml in directory /config
- Copying data from default.yml.sample
- Customize configuration

**development.yml for development environment**

- Create file development.yml in directory /config
- Copying data from development.yml.sample
- Customize configuration

**development.yml for production environment**

- Create file production.yml in directory /config
- Copying data from production.yml.sample
- Customize configuration

## Database migration

```bash
# Run migration
$ npm run migration:run

# Revert migration
$ npm run migration:revert
```

## Seeding data

```bash
$ npm run seed:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Access API Documentation

```bash
http://localhost:3000/docs
```

## Try GRPC Services

Running command script in root directory

```bash
# Auth Service
$ ghz --insecure \
  --proto ./protos/auth.proto \
  --call glovory.Auth.Login \
  -d '{"username":"glovory","password":"GlovoryPassword"}' \
  -O html \
  -o ./brenchmak-result/AuthLogin.html \
  0.0.0.0:50051

# Address Service -> Change glovoryUserId with real user id
$ ghz --insecure \
  --proto ./protos/address.proto \
  --call glovory.Address.List \
  -d '{"user_id":"glovoryUserId"}' \
  -O html \
  -o ./brenchmak-result/AddressList.html \
  0.0.0.0:50051
```

Result directory brenchmark

```bash
$ cd src/brenchmak-result
```
