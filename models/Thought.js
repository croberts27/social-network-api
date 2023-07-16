// require mongoose and moment
const { model, Schema, Types } = require("mongoose");
const moment = require("moment");

// ReactionsSchema
const ReactionSchema = new Schema(
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

const ThoughtSchema = new Schema(
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
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual property called 'reactionCount' that retrieves the length of the thought's 'reactions' array field on query

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create model
const Thought = model("Thought", ThoughtSchema);

// const handleError = (err) => console.log(err);

// Create new instance of the model

// Thought.create({
//   thoughtText: "This is my first thought!",
//   username: "jman777",
// })
//   .then((result) => console.log("Thought has been posted!", result))
//   .catch((err) => handleError(err));

module.exports = Thought;
