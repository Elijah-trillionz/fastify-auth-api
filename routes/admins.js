const {
  getAdminsSchema,
  registerAdminSchema,
  loginAdminSchema,
} = require('../controllers/schemas/admins');

const {
  getAdminsHandler,
  registerAdminHandler,
  loginAdminHandler,
} = require('../controllers/handlers/admins');

const getAdminsOpts = {
  schema: getAdminsSchema,
  handler: getAdminsHandler,
};

const registerAdminOpts = {
  schema: registerAdminSchema,
  handler: registerAdminHandler,
};

const loginAdminOpts = {
  schema: loginAdminSchema,
  handler: loginAdminHandler,
};

const adminRoutes = (fastify, options, done) => {
  // get all admins
  fastify.get('/api/admins', getAdminsOpts);

  // register an admin
  fastify.post('/api/admins/new', registerAdminOpts);

  // login an admin
  fastify.post('/api/admins/login', loginAdminOpts);

  done();
};

module.exports = adminRoutes;
