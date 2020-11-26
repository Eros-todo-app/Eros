# Eros

## About

Eros is the back-end REST API for the Cronus todo app

## Self hosting

### Prerequisites

You will need:

- Docker 3.8

### Installation

To install the project, either download the ZIP and execute it or do the below command.

```bash
git clone https://github.com/Eros-todo-app/Eros.git
```

Once installed to the new directory and create a .env file

```bash
cd Eros
```

```bash
touch .env
```

Edit the .env file so that it looks like the below configuration but with your own secrets and credentials

```env
PORT = 8080
MONGO_URI = mongodb://database:27017/Eros
DB_NAME = TEST-todo-api
SESSION_SECRET = 128bitkey/hash
NODE_ENV = production
SESSION_LIFETIME = 172800000 (how long you want the sessions to last in ms, defaults to two days)
SID = sid (cookie name)
REDIS_URI = redis://redis:6379 (redisURI)
AWS_ACCESS_KEY = AWS KEY (get this by signing up to AWS easy email and getting a prod account)
AWS_SECRET_ACCESS_KEY = AWS ACCESS KEY (Read the above)
```

Build and run with docker-compose

```bash
docer-dompose up --build
```

If you're still having issues, please search the interwebs first and the contact me or make an issue.

## Author

<img src="https://avatars2.githubusercontent.com/u/16852656?s=460&u=b2e5e45840f706b31bc5d4d1acacb4302f3496aa&v=4" width="100" height="100" align="left" style="float: left; margin: 0 10px 0 0;" alt="Runa" >

**Eros** © [Eddie Englund](https://github.com/TitusEntertainment).  
Authored and maintained by TitusEntertainment.

> GitHub [@Eddie Englund](https://github.com/TitusEntertainment)
