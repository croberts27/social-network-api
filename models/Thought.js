const { model, Schema } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1 && v.length <= 280;
      },
      message: (props) =>
        `${props.value} must be between 1 and 280 characters!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (v) {
      //formatting timestamp using a getter method
      return new Date(v).toLocaleString();
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
});

// create model
const Thought = model("Thought", thoughtSchema);

// virtual property called 'reactionCount' that retrieves the length of the thought's 'reactions' array field on query

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const handleError = (err) => console.log(err);

// Create new instance of the model

// Thought.create({
//   thoughtText: "This is my first thought!",
//   username: "jman777",
// })
//   .then((result) => console.log("Thought has been posted!", result))
//   .catch((err) => handleError(err));

module.exports = Thought;
