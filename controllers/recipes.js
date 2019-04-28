// Load the recipe model
const Recipe = require("./../models/recipe");

exports.addRecipe = (req, res, next) => {
  res.status(200).render("recipe-add", {
    pageTitle: "Family Menu : Add a new recipe",
    activePage: "/recipes"
    });
};

exports.getRecipes = (req, res, next) => {
  Recipe.find()
    .then(recipesData => {
      res.status(200).render("recipes", {
        pageTitle: "Family Menu : Your recipes",
        activePage: "/recipes",
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
  const recipe = new Recipe({
    name: name,
    description: description,
    imagePath: `/${imagePath}`,
    tinyImagePath: `/${tinyImagePath}`,
    mediumImagePath: `/${mediumImagePath}`
  });
  recipe.save();
  res.redirect("/");
};

exports.postDeleteRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findByIdAndDelete(recipeId)
    .then(res => {
      console.log(`Deleted recipe ${recipeId}`);
    })
    .catch(err => {
      console.log(err);
    });
  res.redirect("/recipes");
};