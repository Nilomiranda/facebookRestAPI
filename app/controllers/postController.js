const mongoose = require('mongoose');
const postSchema = require('../models/post');
const commentSchema = require('../models/comment');

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  async newPost(req, res, next) {
    try {
      const newPost = await Post.create({ ...req.body, userId: req.userId });
      return res.status(200).json(newPost);
    } catch (err) {
      return next(err);
    }
  },

  async addComment(req, res, next) {
    try {
      const { postId } = req.params;

      // throws an error if no post is found
      if (!postId) {
        return res.status(400).json({ Error: 'Post not found' })
      }

      // looks for post in database
      const post = await Post.findById(postId);

      const newComment = await Comment.create({ ...req.body, userId: req.userId });
      console.log(post);
      post.comments.push(newComment);
      post.save();

      return res.status(200).json(post);
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        return res.status(400).json({ Error: 'Post not found' });
      }
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { postId: id } = req.params; // retrieves post id from URL

      await Post.findByIdAndRemove(id); // find post by id and removes it

      return res.status(200).json({ Message: 'Post deleted' });
    } catch (err) {
      return next(err);
    }
  },
};
