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

/* get Search Results page*/
router.get("/search/:cocktailName?", async (req, res) => {
  const {
    cocktailName
  } = req.params;
  const drinkData = await drinkModel.searchCocktails(cocktailName);

  res.render("template", {
    locals: {
      title: "Results Page",
      drinkData: drinkData,
      sessionData: req.session
    },
    partials: {
      partial: "partial-result"
    }
  });
});

router.post("/search/:cocktailName?", async (req, res) => {
  const {
    cocktailName
  } = req.body;
  const url = `/search/${cocktailName}`;
  (!!cocktailName) ? res.redirect(url): res.redirect('/')
});

/*Get Search by Id page*/
router.get("/search/:cocktail/:id?", async (req, res) => {

  const {
    id
  } = req.params;
  const drinkData = await drinkModel.searchById(id);
  console.log("DRINK DATA =", drinkData);

  res.render("template", {
    locals: {
      title: "Results Page",
      drinkData: drinkData,
      sessionData: req.session
    },
    partials: {
      partial: "partial-searchInfo"
    }
  });
});







module.exports = router;