const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient"
  }],
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chef"
  }
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;

// {
//   "title": "banana bread",
//   "instructions": "bake",
//   "level": "Easy Peasy",
//   "ingredients": ["6601833d36e95cb771130ddf"],
//   "image":"https://images.media-allrecipes.com/images/75131.jpg",
//   "duration": 100,
//   "chef": "6601838636e95cb771130de2"
//   }
