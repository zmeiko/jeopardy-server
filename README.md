# JEOPARDY SERVER

---
## Requirements

For development, you will only need docker and docker-compose.

## Configure app

### SIQ Packages
1. Download a sample .siq package (E.g http://vladimirkhil.com/sistorage/na_vecherok.siq)
1. Move it to `%PROJECT_DIR%/siq_packages`

### .env
Also you can change .env file

```
DATABASE_CONNECTION=postgres
DATABASE_HOST=db
DATABASE_POST=5432
DATABASE_USERNAEM=postgres
DATABASE_PASSWORD=password
DATABASE_DATABASE=postgres
SIQ_DIR=/home/node/app/siq_packages
```
## Running the project

### Start docker containers
    $ yarn docker-watch-server -d

### Playground
http://localhost:4000/graphql
   
Change playground settings

```json
"request.credentials": "include",
```   
   
Create new user
```graphql
mutation SignUP {
  signUp(data:{
     username:"test",
     password:"test"
  }) {
    accessToken
  }
}
```


## Start production build
    $ docker-compose up -d --build