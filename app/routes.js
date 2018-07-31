const express = require('express');

const routes = express.Router();

routes.get('/test', (req, res) => {
  res.status(200).json({ Message: 'Successfully connnected' });
});

module.exports = routes;
