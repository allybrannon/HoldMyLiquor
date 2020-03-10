const express = require("express"),
  router = express.Router(),
  drinkModel = require("../models/drinkModel");

/* GET home page. */
router.get("/", async (req, res) => {
  res.render("template", {
    locals: {
      title: "Drink Up",
      sessionData: req.session
    },
    partials: {
      partial: "partial-index"
    }
  });
});

module.exports = router;
