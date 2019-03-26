const mongoose = require('mongoose');

// Schema is the class
const Schema = mongoose.Schema;

// instantiate a new object of class Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);