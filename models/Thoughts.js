// require mongoose and moment
const { model, Schema, Types } = require("mongoose");
const moment = require("moment");

const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use moment
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// ReactionsSchema
const ReactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// virtual property called 'reactionCount' that retrieves the length of the thought's 'reactions' array field on query

ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create model
const Thoughts = model("Thoughts", thoughtSchema);

// const handleError = (err) => console.log(err);

// Create new instance of the model

// Thought.create({
//   thoughtText: "This is my first thought!",
//   username: "jman777",
// })
//   .then((result) => console.log("Thought has been posted!", result))
//   .catch((err) => handleError(err));

module.exports = Thoughts;
