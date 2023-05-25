const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      max_length: 50,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Please add a valid email address.',
      ],
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  }, 
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
