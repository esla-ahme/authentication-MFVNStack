### Login And Register backend using (NodeJs - Fastify - Mongodb)

##### How to run:
create `.env` file contains 
>SECRET_JWT = // base for JWT
>CONNECT_DB = // databse url

```
npm install
npm run dev (or) npm run start
```
>server runs on `localhost:5000`

##### Docs: [Swagger Documentation](http://localhost:5000/docs/) 
##### Routes:
1. POST: Register `/regester`
  body : {name, email, password}

2. POST: Login `/login`
  body : {email, password}

3. GET: Get all users `/users`
  private route must has a header contains token

