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

  async destroy(req, res, next) {
    try {
      const { postId: id } = req.params; // retrieves post id from URL
      const ownerId = req.userId; // gets the ID of the logged user
      const post = Post.findById(id);

      // checks if post is owned by the logged user
      if (post.userId !== ownerId) {
        // if not, doesn't allow to delete it
        return res.status(401).json({ Error: 'User can\'t delete post' });
      }

      // if so, proceeds with the exclusion
      await Post.findByIdAndRemove(id); // find post by id and removes it

      return res.status(200).json({ Message: 'Post deleted' });
    } catch (err) {
      return next(err);
    }
  },

  async addComment(req, res, next) {
    try {
      const { postId } = req.params;

      // throws an error if no post is found
      if (!postId) {
        return res.status(400).json({ Error: 'Post not found' });
      }

      // looks for post in database
      const post = await Post.findById(postId);

      const newComment = await Comment.create({ ...req.body, userId: req.userId });
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

  async removeComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const ownerId = req.userId;
      const comment = await Comment.findById(commentId);

      // checks if logged user is the owner of the comment
      if (comment.userId.toString() !== ownerId) {
        // if it's not the logged user's comment, doesn't allow to delete
        return res.status(401).json({ Error: 'Unable to delete comment' });
      }

      // if it is the logged user's comment, proceeds to delete
      await Comment.findByIdAndRemove(commentId);

      return res.status(200).json({ Error: 'Comment removed' });
    } catch (err) {
      return next(err);
    }
  },

  async likes(req, res, next) {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId); // looks for post in database

      // check if post exists
      if (!post) {
        // if not, throws an error
        return res.status(400).json({ Error: 'Post not found' });
      }

      // checks if post has a like from the logged user (the one who's giving the like)
      if (post.likes.indexOf(req.userId) > -1) {
        /**
         * if the above condition is met, then we remove the like
         * because it's assumed that the user wants to dislike the post
         */
        const position = post.likes.indexOf(req.userId); // find user id position
        post.likes.splice(position, 1); // removes like
        post.save();

        return res.status(200).json({ Message: 'Post disliked' });
      }

      post.likes.push(req.userId); // likes post with the logged user
      post.save();

      return res.status(200).json({ Message: 'Post liked' });
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        return res.status(400).json({ Error: 'Invalid post id' });
      }
      return next(err);
    }
  },
};
