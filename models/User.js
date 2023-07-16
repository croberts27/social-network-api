const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "Username is Required",
    },

    email: {
      type: String,
      unique: true,
      required: "Username is Required",
      match: [/.+@.+\..+/],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

// const handleError = (err) => console.error(err);

// Create a new instance of the model, a document

// User.create({
//   username: "jman777",
//   email: "jman4ever@gmail.com",
// })
//   .then((result) => console.log("Created new user", result))
//   .catch((err) => handleError(err));

module.exports = User;
