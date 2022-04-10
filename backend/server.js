const fastify = require('fastify')({ logger: true })
const dotenv = require("dotenv");
const PORT = 5000

dotenv.config();

//register mongodb
fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url: process.env.CONNECT_DB,
});

fastify.register(require('fastify-cors'), {
  origin: '*'
})

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  }
})
fastify.register(require('./routes/users'));

// start a server on PORT
const start = async () => {
  try {
    await fastify.listen(PORT)
  }
  catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()