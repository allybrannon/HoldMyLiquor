const express = require("express"),
  router = express.Router(),
  drinkModel = require("../models/drinkModel");

/* GET home page. */
router.get("/", async (req, res) => {
  const drinkData = await drinkModel.getOneCocktail();

  res.render("template", {
    locals: {
      title: "HOME",
      drinkData: drinkData,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: "partial-index"
    }
  });
});

module.exports = router;
