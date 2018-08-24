const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');
const authMiddleware = require('./middlewares/auth');

/**
 * Authentication routes
 */
routes.post('/signup', controllers.authController.signup);
routes.get('/signin', controllers.authController.signin);

routes.use(authMiddleware.auth); // use of the authentication middleware

/**
 * From this point, all the routes below will only work if the user is
 * authenticated
 */

/**
 * Routes related to posting
 */
routes.post('/posts/new', controllers.postController.newPost); // creating a new post
routes.delete('/posts/:postId/delete', controllers.postController.destroy); // delete a post
routes.post('/posts/:postId/comment', controllers.postController.addComment); // adding comments
routes.delete('/posts/:postId/comment/:commentId/remove', controllers.postController.removeComment); // removing comments
routes.post('/posts/:postId', controllers.postController.likes); // liking a post

/**
 * Routes related to friendship between users
 */
routes.post('/users/add/:userId', controllers.userController.addFriend); // adding a new friend

module.exports = routes;
