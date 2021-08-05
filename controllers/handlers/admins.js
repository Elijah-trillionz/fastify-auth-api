const admins = require('../../cloud/admins'); // import the admins array
const jwt = require('jsonwebtoken');

const getAdminsHandler = (req, reply) => {
  reply.send(admins);
};

const registerAdminHandler = (req, reply) => {
  const { username, email, password } = req.body;
  const id = admins.length + 1;

  admins.push({
    id,
    username,
    email,
    password, // you can hash the password if you want
  });

  reply.send('Account created successfully');
};

const loginAdminHandler = async (req, reply) => {
  const { username, password } = req.body;

  try {
    const admin = await getName(); // assumming we used mongodb

    // if (!admin) {
    //   return reply.send("This admin doesn't exist");
    // }

    // // check if password is correct
    // if (password !== admin.password) {
    //   return reply.send('Invalid credentials');
    // }

    // sign a token
    jwt.sign(
      { id: admin },
      'my_jwt_secret',
      { expiresIn: 3 * 86400 },
      (err, token) => {
        if (err) throw err;

        reply.send({ token });
      }
    );

    await reply;
  } catch (err) {
    console.log(err);
    reply.status(500).send('Server error');
  }
};

async function getName() {
  setTimeout(() => {
    return 'james';
  }, 2000);
}

module.exports = { getAdminsHandler, registerAdminHandler, loginAdminHandler };
