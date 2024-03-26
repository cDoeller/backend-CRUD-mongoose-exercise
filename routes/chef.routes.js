const router = require("express").Router();
const Chef = require("../models/Chef.model");

// POST
router.post("/chefs", (req, res) => {
  Chef.create(req.body)
    .then((newChef) => {
      res.json(newChef);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET
router.get("/chefs", (req, res) => {
  Chef.find()
    // ********************************* Populate object ID with actual recipes data
    .populate("recipes")
    .then((chef) => {
      res.json(chef);
    })
    .catch((err) => console.log(err));
});

// GET BY ID
router.get("/chefs/:id", (req, res) => {
  Chef.findById(req.params.id)
    // ********************************* Populate object ID with actual recipes data
    .populate("recipes")
    .then((chef) => {
      res.json(chef);
      // console.log(req.params);
    })
    .catch((err) => console.log(err));
});

// ********************************* UPDATE new recipes - only -
router.put("/chefs/:id", (req, res) => {
  Chef.findByIdAndUpdate(req.params.id, { $push: { recipes: req.body.recipes}})
    .then((chefData) => {
      res.json(chefData);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
