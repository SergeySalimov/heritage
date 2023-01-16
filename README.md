# HERITAGE

## Site is under construction....

## NODE VERSION

```
16.3.2
```

## Installation

```bash
$ npm install
```

## Create MongoDb Container by Docker (if needed)

```bash
$ start-mongo-db.sh
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

### Starting date 14/01/2023

#### 15/01/2023
- deploy on netlify (failed)

#### 14/01/2023 - 15/01/2023
- set up ide, node, repo 
- created initial nest project
- create dev and prod env variables
- provide config module
- connected to mongo db
- create base user schema and endpoints
- install swagger and creat description for base user get and post request 

### Plans
- This is going to be complete solution for site like a `FAMILY TREE` site.
- Backend is supposed to be written on Nest.js with MobgoDb database, also SQL database can be added in future
- swagger for backend have to be created
- FrontEnd on Angular 15.1, powered by NgRx
- no unit-tests on back and on front
- Expect presence of CI/CD pipelines
- power deploy by Docker
- deploy repo on `netlify.com`

