const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 280;
      },
      message: props => `${props.value} must be between 1 and 280 characters!`
    }
  }
});

const Thought = mongoose.model('Thought', thoughtSchema);
