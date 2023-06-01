const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type:String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual to get the reaction count of a thought
thoughtSchema.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
