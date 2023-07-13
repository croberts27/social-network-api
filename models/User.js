const mongoose = require("mongoose");

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema(
  {
    // Configure individual properties using Schema Types
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Define a virtual property 'friendCount' using the 'get' method
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", userSchema);

const handleError = (err) => console.error(err);

// Create a new instance of the model, a document

// User.create({
//   username: "jman777",
//   email: "jman4ever@gmail.com",
// })
//   .then((result) => console.log("Created new user", result))
//   .catch((err) => handleError(err));

module.exports = User;
