const hbs = require('handlebars');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const fs = require('fs');
const path = require('path');
const {
  host,
  port,
  user,
  pass,
  templatesPath,
} = require('../config/mail');

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

module.exports = ({ template, context, ...options }) => {
  // reading the template
  let hbsTemplate;

  // checking for templating
  if (template) {
    const file = fs.readFileSync(path.join(templatesPath, `${template}.hbs`), 'utf-8');
    hbsTemplate = hbs.compile(file)(context);
  }

  const mailHTML = hbsTemplate || options.html;

  return transporter.sendMail({
    ...options,
    html: mailHTML,
    text: htmlToText.fromString(mailHTML).trim(),
  });
};
