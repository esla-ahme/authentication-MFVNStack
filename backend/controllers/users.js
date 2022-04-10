const { ObjectID } = require("mongodb");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const getUsers = async function (req, reply) {
  const itemsDB = this.mongo.db.collection("users");
  const result = await itemsDB.find({}).toArray();
  reply.send(result)
}


const regUser = async function (req, reply) {
  const { name, email, password } = req.body;
  const usersDB = this.mongo.db.collection("users");
  const user = await usersDB.findOne({ email })
  if (user) {
    return reply.send("This email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const User = {

    name,
    email,
    password: hashPassword
  }
  try {
    const result = await usersDB.insertOne(User);

    reply.code(201).send(User);

  }
  catch (error) {
    console.error(error)
  }

};

const loginUser = async function (req, reply) {
  const { email, password } = req.body;
  const usersDB = this.mongo.db.collection("users");
  const user = await usersDB.findOne({ email })
  console.log(user)

  if (!user) {

    return reply.send("This user doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return reply.send('Invalid password');
  }
  // sign a token
  jwt.sign(
    { id: user._id },
    process.env.SECRET_JWT,
    { expiresIn: 3 * 86400 },
    (err, token) => {
      if (err) reply.status(500).send(new Error(err));

      reply.code(201).send({ token });
    }
  );
};

const verifyToken = (req, reply, done) => {
  const { token } = req.headers;

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      done(new Error('Unauthorized'));
    }

    req.user = {
      id: decoded.id,
    };
  });

  done();
};

module.exports = { getUsers, regUser, loginUser, verifyToken }