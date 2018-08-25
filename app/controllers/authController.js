const mongoose = require('mongoose');
const userSchema = require('../models/user');
const sendMail = require('../../services/mailer');

const User = mongoose.model('User', userSchema);

module.exports = {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body; // retrieving passed data

      // checking the passed data
      if (!name || !email || !password) {
        return res.status(400).json({
          Error: 'Please, fill in the credentials to complete signup',
        });
      }

      // checks if email is already used by another account
      const checkedEmail = await User.findOne({ email });
      if (checkedEmail) {
        return res.status(400).json({
          Error: 'Email is already associated to another account',
        });
      }

      const newUser = await User.create(req.body);

      const welcomeMail = {
        from: 'Facebook <nilomiranda3@gmail.com>',
        to: email,
        subject: `Welcome to Facebook ${name}`,
        template: 'welcome',
        context: {
          name,
        },
      };

      sendMail(welcomeMail);

      return res.status(200).json({
        newUser,
        token: newUser.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      // checks if user is registered
      if (!user) {
        return res.status(400).json({ Error: 'Email not registered' });
      }

      // checks if password is correct
      if (!await user.compareHash(password)) {
        return res.status(400).json({ Error: 'Password incorrect' });
      }

      // if all checks pass, user is authenticated
      return res.status(200).json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },
};
