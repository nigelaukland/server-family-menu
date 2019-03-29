const express = require("express");
const router = express.Router();
const recipeController = require("./../controllers/recipes");
const isAuth = require("./../middleware/isAuth");

router.get("/recipes/add", isAuth, recipeController.addRecipe);

router.get("/recipes", recipeController.getRecipes);

router.post("/recipe", isAuth, recipeController.postAddRecipe);

module.exports = router;
