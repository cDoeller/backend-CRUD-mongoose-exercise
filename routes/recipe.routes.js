const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
// ********************************* import Chef to update recipes array when creating new recipe
const Chef = require("../models/Chef.model");
const Ingredient = require("../models/Ingredient.model");

// CREATE
router.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((newRecipe) => {
      // ********************************* push new recipe into the chef -> recipes array
      // 1. --> find chef by id in chef collection, update chef recipes array with pushing the new recipe id
      Chef.findByIdAndUpdate(req.body.chef, {
        $push: { recipes: newRecipe._id },
      })
        .then(() => {
          console.log("recipe added to chef.");
        })
        .catch((err) => {
          console.log(err);
        });
      return newRecipe;
    })
    // ********************************* MANY TO MANY
    // 2. --> find all ingredients by id in ingredients collection, update recipes array with pushing the new recipe id
    .then((newRecipe) => {
      return Ingredient.updateMany(
        { _id: { $in: req.body.ingredients } },
        { $push: { recipes: newRecipe._id } }
      );
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// READ
router.get("/recipes", (req, res) => {
  Recipe.find()
    // ********************************* Populate object ID with actual chef data
    .populate("chef")
    .populate("ingredients")
    .then((allRecipes) => {
      res.json(allRecipes);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

router.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    // ********************************* Populate object ID with actual chef data
    .populate("chef")
    .then((oneRecipie) => {
      res.json(oneRecipie);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

// UPDATE
router.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      res.json(updatedRecipe);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

// DELETE
router.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json();
    })
    .catch((err) => {
      res.json();
    });
});

module.exports = router;
