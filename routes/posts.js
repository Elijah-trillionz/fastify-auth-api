const {
  getPostsSchema,
  getPostSchema,
  addPostSchema,
  updatePostSchema,
  deletePostSchema,
} = require('../controllers/schemas/posts.js');

const {
  getPostsHandler,
  getPostHandler,
  addPostHandler,
  updatePostHandler,
  deletePostHandler,
} = require('../controllers/handlers/posts.js');

const verifyToken = require('../controllers/auth/verifyToken')

const getPostsOpts = {
  schema: getPostsSchema,
  handler: getPostsHandler,
};

const getPostOpts = {
  schema: getPostSchema,
  handler: getPostHandler,
};

const addPostOpts = {
  schema: addPostSchema,
  handler: addPostHandler,
};

const updatePostOpts = {
  schema: updatePostSchema,
  handler: updatePostHandler,
};

const deletePostOpts = {
  schema: deletePostSchema,
  handler: deletePostHandler,
};


const postRoutes = (fastify, opts, done) => {
  // get all posts
  fastify.get('/api/posts', getPostsOpts);

  // get a post
  fastify.get('/api/posts/:id', getPostOpts);
  
  fastify.register(require('fastify-auth')).after(() => privatePostRoutes(fastify));

  done();
};

const privatePostRoutes = (fastify) => {
  // create a new post
fastify.post('/api/posts/new', {
  preHandler: fastify.auth([verifyToken]),
  ...addPostOpts
});

// update a post
fastify.put('/api/posts/edit/:id', {
  preHandler: fastify.auth([verifyToken]),
  ...updatePostOpts
});

// delete a post
fastify.delete('/api/posts/:id', {
  preHandler: fastify.auth([verifyToken]),
  ...deletePostOpts
});
}

module.exports = postRoutes;
