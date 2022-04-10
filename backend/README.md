### Login And Register backend using (NodeJs - Fastify - Mongodb)


##### Docs: [Documentation](http://localhost:5000/docs/) 
##### Routes:
1. POST: Register `/regester`
  body : {name, email, password}

2. POST: Login `/login`
  body : {email, password}

3. GET: Get all users `/users`
  private route must has a header contains token

