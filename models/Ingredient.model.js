const { Schema, model, default: mongoose } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
    default: false,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;

// {
//     "name": "Banana",
//     "isInStock": true
// }