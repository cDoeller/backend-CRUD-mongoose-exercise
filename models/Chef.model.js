const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  hasPublishedRecipes: {
    type: Boolean,
    default: false,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    },
  ],
});

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;

// {
//     "name":"chef 1",
//     "recipes":[]
// }