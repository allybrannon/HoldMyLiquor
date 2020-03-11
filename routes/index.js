const express = require("express"),
  router = express.Router(),
  drinkModel = require("../models/drinkModel");

/* GET home page. */
router.get("/", async (req, res) => {
  res.render("template", {
    locals: {
      title: "HOME",
      sessionData: req.session
    },
    partials: {
      partial: "partial-index"
    }
  });
});

/* GET drink page. */
router.get("/drink", async (req, res) => {
  let drinkData = await drinkModel.getOneCocktail(),
    ingredientData = [],
    measureData = [];

  drinkData = drinkData.drinks[0];
  for (let [key, value] of Object.entries(drinkData)) {
    if (key.toString().substring(0, 13) === "strIngredient") {
      ingredientData.push(value);
    }
    if (key.toString().substring(0, 10) === "strMeasure") {
      measureData.push(value);
    }
  }

  res.render("template", {
    locals: {
      title: "DRINK",
      sessionData: req.session,
      drinkData: drinkData,
      ingredientData: ingredientData,
      measureData: measureData
    },
    partials: {
      partial: "partial-drink"
    }
  });
});

module.exports = router;
