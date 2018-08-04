/**
 * mongoose database connection configuration
 */
const path = require('path');

module.exports = {
  url: 'mongodb://localhost/des03gonnode',
  modelsPath: path.resolve('app', 'models'),
};
