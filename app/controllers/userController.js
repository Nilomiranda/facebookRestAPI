const mongoose = require('mongoose');
const userSchema = require('../models/user');

const User = mongoose.model('User', userSchema);

module.exports = {
  async addFriend(req, res, next) {
    try {
      // checking if the user exists in the database
      const { userId } = req.params;

      // looks for user in the database
      const returnedUser = await User.findById(userId);

      /**
       * the error for not finding the user through and
       * invalid Id (mongoose nonaccepted format)
       * is treated in the catch routine down below
       */

      /**
       * this throws an error if the user is not found
       * assuming the id format is a format accepted by mongodb
       */
      if (!returnedUser) {
        return res.status(400).json({ Error: 'User doesn\'t exist' });
      }

      // adding the logged user to the target's friend list
      returnedUser.friends.push(req.userId);
      console.log(returnedUser.friends);

      // looking for the logged user in the database
      const me = await User.findById(req.userId);

      // saving the added user id to the logged user friend list (array)
      me.friends.push(returnedUser.id);
      console.log(me.friends);

      // saving the alterations in each document (updating user's data in database)
      returnedUser.save();
      me.save();


      return res.status(200).json({ Message: 'Everything working just fine' });
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        res.status(400).json({ Error: 'User doesn \'t exist' });
        return next();
      }
      return next(err);
    }
  },
};
