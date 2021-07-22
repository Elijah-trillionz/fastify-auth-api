const posts = require('../../cloud/posts.js');

const getPostsHandler = (req, reply) => {
  reply.send(posts);
};

const getPostHandler = (req, reply) => {
  const { id } = req.params;

  const post = posts.filter((post) => {
    return post.id === id;
  })[0];

  if (!post) {
    return reply.status(404).send(new Error('Post not found'));
  }

  return reply.send(post);
};

const addPostHandler = (req, reply) => {
  const { title, body } = req.body; // no body parser required for this to work

  const id = posts.length + 1; // posts is imported from cloud/posts.js
  posts.push({ id, title, body });

  reply.send('Post added');
};

const updatePostHandler = (req, reply) => {
  const { title, body } = req.body;
  const { id } = req.params;

  const post = posts.filter((post) => {
    return post.id === id;
  })[0];

  if (!post) {
    return reply.status(404).send(new Error("Post doesn't exist"));
  }

  post.title = title;
  post.body = body;

  return reply.send('Post updated');
};

const deletePostHandler = (req, reply) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((post) => {
    return post.id === id;
  });

  if (postIndex === -1) {
    return reply.status(404).send(new Error("Post doesn't exist"));
  }

  posts.splice(postIndex, 1);

  return reply.send('Post deleted');
};

module.exports = {
  getPostsHandler,
  getPostHandler,
  addPostHandler,
  updatePostHandler,
  deletePostHandler,
};
