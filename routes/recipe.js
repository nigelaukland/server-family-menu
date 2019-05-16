const express = require("express");
const router = express.Router();
const recipeController = require("./../controllers/recipes");
const isAuth = require("./../middleware/isAuth");

router.get("/recipes/add", isAuth, recipeController.addRecipe);

router.get("/recipes", recipeController.getRecipes);

router.post("/recipe", isAuth, recipeController.postAddRecipe);

router.delete("/recipe/:recipeId", isAuth, recipeController.postDeleteRecipe);

//TODO add edit route

module.exports = router;
