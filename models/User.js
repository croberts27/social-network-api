const mongoose = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  username: { type: String, required: true, unique: true, trim: true},
  email: {type: String,required: true,unique: true,validate: {validator: function(v) {return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);},message: props => `${props.value} is not a valid email address!`}},
  thoughts: {},

  lastAccessed: { type: Date, default: Date.now },

});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);


// Create a new instance of the model, a document


// Create a new instance with required title and optional author properties




User.create({ title: 'Harold and the Purple Crayon' })
  .then(result => console.log('Created new document', result))
  .catch(err => handleError(err));

module.exports = User;