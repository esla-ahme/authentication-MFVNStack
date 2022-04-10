const { getUsers, regUser, loginUser, verifyToken } = require("../controllers/users");

// header
const headerSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: { type: 'string' },
  },
};

//User scehma
const User =
{
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
  },
}
const getUsersOpts = {
  headers: headerSchema,
  schema: {
    response: {
      200: {
        type: 'array',
        users: User
      }
    }
  },
  handler: getUsers
}

const regUserOpts = {
  schema: {
    response: {
      201: User
    },
    //validation
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      }
    }
  },
  handler: regUser
}


const loginUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          token: { type: 'string' },
        },
      },
    },
  },
  handler: loginUser
}

const userRoutes = (fastify, options, done) => {
  // all our routes will appear here
  fastify.post('/register', regUserOpts)
  fastify.post('/login', loginUserOpts)
  fastify
    .register(require('fastify-auth'))
    .after(() => privateUserRoutes(fastify));

  done();
};

function privateUserRoutes(fastify) {

  fastify.get('/users', {
    preHandler: fastify.auth([verifyToken])
    , ...getUsersOpts
  })


}


module.exports = userRoutes