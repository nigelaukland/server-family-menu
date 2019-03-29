// Require the fs module for file IO, and path for OS-agnostic paths
const Recipe = require('./../models/recipe');

exports.addRecipe = (req, res, next) => {
  res.status(200).render("recipe-add", {
    pageTitle: "Family Menu : Add a new recipe",
    activePage: "/recipes",
    isAuthenticated: req.session.isAuthenticated,
    csrfToken: req.csrfToken()
  });
};

exports.getRecipes = (req, res, next) => {
  Recipe.find()
  .then(recipesData => {
    res.status(200).render("recipes", {
      pageTitle: "Family Menu : Your recipes",
      activePage: "/recipes",
      recipes: recipesData,
      isAuthenticated: req.session.isAuthenticated,
      csrfToken: req.csrfToken()
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postAddRecipe = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  // if imagePath is an empty string then set it to undefined to ensure that mongoose applies the default
  const imagePath = (req.body.imagePath == '') ? undefined : req.body.imagePath;
  const recipe = new Recipe({name: name, description: description, imagePath: imagePath});
  recipe.save();
  res.redirect('/');
};
