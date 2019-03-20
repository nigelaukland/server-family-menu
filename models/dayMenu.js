const mongoose = require('mongoose');

// Schema is the class
const Schema = mongoose.Schema;

// instantiate a new object of class Schema
const dayMenuSchema = new Schema({
  startDate: {
      type: Date,
      required: true,
      unique: true
  },
  morningText: {
      type: String,
      required: false
  },
  morningRecipeId: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: false
  },
  lunchText: {
      type: String,
      required: false
  },
  lunchRecipeId: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: false
  },
  dinnerText: {
      type: String,
      required: false
  },
  dinnerRecipeId: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: false
  }
});

module.exports = mongoose.model('DayMenu', dayMenuSchema);