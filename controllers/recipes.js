// Load fs for working with filesystem
const fs = require('fs');

// Load os.EOL for working with EOL characters
const EOL = require('os').EOL;

// Load the recipe model
const Recipe = require('./../models/recipe');

exports.addRecipe = (req, res, next) => {
  res.status(200).render('recipe-add', {
    pageTitle: 'Family Menu : Add a new recipe',
    activePage: '/recipes'
  });
};

exports.getRecipes = (req, res, next) => {
  Recipe.find()
    .then(recipesData => {
      res.status(200).render('recipes', {
        pageTitle: 'Family Menu : Your recipes',
        activePage: '/recipes',
        recipes: recipesData
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postAddRecipe = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const image = req.file;
  console.log(req.file);
  const imagePath = image.path;
  const tinyImagePath = req.body.tinyImagePath;
  const mediumImagePath = req.body.mediumImagePath;
  const ingredients = req.body.ingredients.split(EOL);
  
  // parse the ingredients  
  let ingredientsList = ingredients.map((value, index, output) => {
    // regex are complicated.
    // matches the numerical value at the start, with optional decimal.
    var quantity = value.match(/^\d+\.?\d*/)[0];
    // gets the units immediately following the value
    var unit = value.split(' ')[0].replace(quantity, '');
    // gets the ingredient as the remainder of the line
    var ingredient = value.slice(value.indexOf(' ')).trim();
    // return the mapped object
    return {
      quantity: quantity,
      unit: unit,
      ingredient: ingredient 
    }
  });
  console.log(ingredientsList);
  
  const recipe = new Recipe({
    name: name,
    description: description,
    imagePath: `${imagePath}`,
    tinyImagePath: `${tinyImagePath}`,
    mediumImagePath: `${mediumImagePath}`,
    ingredientsList: ingredientsList
  });
  recipe.save();
  res.redirect('/');
};

exports.postDeleteRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findByIdAndDelete(recipeId) // returns a promise which resolves to the deleted object.
    .then(recipe => {
      fs.unlinkSync(recipe.imagePath);
      fs.unlinkSync(recipe.tinyImagePath);
      fs.unlinkSync(recipe.mediumImagePath);
      res.status(200).json({
        message: `Success, deleted recipe ${recipeId}`
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Deleting ${recipeId} failed`
      });
    });
};
