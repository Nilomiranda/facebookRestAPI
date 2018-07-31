/**
 * mongoose database configuration connection
 */
const path = require('path');

module.exports = {
  url: 'mongodb://localhost/facebookapi',
  modelsPath: path.resolve('app', 'models'),
};
