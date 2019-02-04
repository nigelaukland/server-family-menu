// Require the fs module for file IO, and path for OS-agnostic paths
const Recipe = require('./../models/recipe');

const fs = require('fs');
const path = require('path');

exports.addRecipe = (req, res, next) => {
  res.status(200).render("recipe-add", {
    pageTitle: "Family Menu : Add a new recipe",
    activePage: "/recipes"
  });
};

exports.getRecipes = (req, res, next) => {
  Recipe.getAllRecipes(recipesData => {
    res.status(200).render("recipes", {
      pageTitle: "Family Menu : Your recipes",
      activePage: "/recipes",
      recipes: recipesData
    });
  });
};

exports.postAddRecipe = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const imagePath = req.body.imagePath;
  const recipe = new Recipe(name, description, imagePath);
  recipe.addRecipe();
  res.redirect('/');
}
