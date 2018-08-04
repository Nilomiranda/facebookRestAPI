const mongoose = require('mongoose');
const userSchema = require('../models/user');

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

      // check if email is already used by another account
      const checkedEmail = await User.findOne({ email });
      if (checkedEmail) {
        return res.status(400).json({
          Error: 'Email is already associated to another account',
        });
      }

      const newUser = await User.create(req.body);

      return res.status(200).json(newUser);
    } catch (err) {
      return next(err);
    }
  },
};
