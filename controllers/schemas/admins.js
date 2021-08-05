const typeString = { type: 'string' };

const getAdminsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          username: typeString,
          email: typeString,
        },
      },
    },
  },
};

const registerAdminSchema = {
  body: {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
      username: typeString,
      email: typeString,
      password: typeString,
    },
  },
  response: {
    200: typeString,
  },
};

const loginAdminSchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: typeString,
      password: typeString,
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: typeString,
      },
    },
  },
};

module.exports = { getAdminsSchema, registerAdminSchema, loginAdminSchema };
