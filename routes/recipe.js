const express = require("express");
const router = express.Router();
const recipeController = require("./../controllers/recipes");

router.get("/recipes/add", recipeController.addRecipe);

router.get("/recipes", recipeController.getRecipes);

router.post("/recipe", recipeController.postAddRecipe);

module.exports = router;
