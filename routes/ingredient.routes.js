const router = require("express").Router();
const Ingredient = require("../models/Ingredient.model");
const Recipe = require("../models/Recipe.model");

router.post("/ingredients", (req, res) => {
  Ingredient.create(req.body)
    .then((newIngredient) => {
      // ************************************************* MANY TO MANY
      // update ingredients in recipes
      // > select all documents of Recipe Collection that have their id in the array of recipes in this new ingredient
      // > push this new ingredient id into their array of ingredients
      return Recipe.updateMany(
        { _id: { $in: req.body.recipes } },
        { $push: { ingredients: newIngredient._id } }
      );
    })
    .then((updatedRecipe) => {
      res.json(updatedRecipe);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/ingredients", (req, res) => {
  Ingredient.find()
    .populate("recipes")
    .then((ingredients) => {
      res.json(ingredients);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/ingredients/:id", (req, res) => {
  Ingredient.findById(req.params.id)
    .populate("recipes")
    .then((ingredient) => {
      res.json(ingredient);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
