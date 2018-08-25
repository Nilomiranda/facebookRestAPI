/**
 * configuration for nodemailer
 * this file contains the transporter settings
 * host, smtp, port, user and password
 */

const path = require('path');

module.exports = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  user: '9e6d0f2cbee0f7',
  pass: '9f62e4b04c9b39',
  templatesPath: path.resolve('./app/tools/mail'),
};
