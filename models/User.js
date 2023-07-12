const mongoose = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  username: { type: String, required: true, unique: true, trim: true},
  email: {type: String,required: true,unique: true,validate: {validator: function(v) {return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);},message: props => `${props.value} is not a valid email address!`}},
  thoughts: {},
  friends: {}
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);


// Create a new instance of the model, a document

User
  .create({
    username: 'jman777',
    email: 'jman777@gmail.com'
  })
  .then(result => console.log('Created new user', result))
  .catch(err => handleError(err));


module.exports = User;