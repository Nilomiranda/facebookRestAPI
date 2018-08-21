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
  comments: {
    type: String,
  },
  likes: {
    type: Number,
  },
});

mongoose.model('Post', PostSchema);

module.exports = PostSchema;
