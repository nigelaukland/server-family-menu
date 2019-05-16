const mongoose = require('mongoose');

// Schema is the class
const Schema = mongoose.Schema;

// instantiate a new object of class Schema
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imagePath: {
    type: String,
    required: false,
    default: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png'
    },
  tinyImagePath: {
    type: String,
    required: false,
    default: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png'
    },
  mediumImagePath: {
    type: String,
    required: false,
    default: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png'
    },
  ingredientsList: {
      type: [{}],
      required: false
    }
  });

module.exports = mongoose.model('Recipe', recipeSchema);