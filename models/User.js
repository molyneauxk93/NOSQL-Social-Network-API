const { Schema, model, Types } = require('mongoose');
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
    thoughts: [{ type: Types.ObjectId, ref: 'Thought'}],
    friends: [{type: Types.ObjectId, ref: 'User'}],
  }, 
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual to get the friend count of a particular user 
userSchema.virtual('friendCount')
.get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
