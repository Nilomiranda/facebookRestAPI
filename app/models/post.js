const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId, // a mongoose type of id
    ref: 'User', // refering to the USER model
    required: true, // you need an ID to create a new post
  },
  content: {
    type: String,
  },
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

mongoose.model('Post', PostSchema);

module.exports = PostSchema;
