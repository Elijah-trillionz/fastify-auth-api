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

  // create a new post
  fastify.post('/api/posts/new', addPostOpts);

  // update a post
  fastify.put('/api/posts/edit/:id', updatePostOpts);

  // delete a post
  fastify.delete('/api/posts/:id', deletePostOpts);

  done();
};

module.exports = postRoutes;
