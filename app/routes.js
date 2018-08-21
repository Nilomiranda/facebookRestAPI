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

routes.post('/posts/new', controllers.postController.newPost); // creating a new post
routes.delete('/posts/:postId/delete', controllers.postController.destroy); // delete a post

module.exports = routes;
