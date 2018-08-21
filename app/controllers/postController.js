const mongoose = require('mongoose');
const postSchema = require('../models/post');

const Post = mongoose.model('Post', postSchema);

module.exports = {
  async newPost(req, res, next) {
    try {
      const newPost = await Post.create({ ...req.body, userId: req.userId });
      return res.status(200).json(newPost);
    } catch (err) {
      return next(err);
    }
  },
}
