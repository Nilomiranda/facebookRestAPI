const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8); // create a hashed pass
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: 86400,
    });
  },
};

mongoose.model('User', UserSchema);

module.exports = UserSchema;
