const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');

/**
 * Authentication routes
 */
routes.post('/signup', controllers.authController.signup);
routes.get('/signin', controllers.authController.signin);


module.exports = routes;
