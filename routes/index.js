const express = require("express"),
  router = express.Router(),
  drinkModel = require("../models/drinkModel"),
  favoriteModel = require('../models/favoriteModel')

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
router.get("/drink/:id?", async (req, res) => {
  let {
    id
  } = req.params;
  let drinkData = await drinkModel.getOneCocktail(id),
    getComments = await drinkModel.getAllCommentsByID(id),
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
      measureData: measureData,
      getComments: getComments
    },
    partials: {
      partial: "partial-drink"
    }
  });
});

router.post("/", async function (req, res) {
  console.log("req body:", req.body);
  const profile_id = req.session.profile_id;
  const {
    drink_id,
    comment_title,
    comment_review,
    rating
  } = req.body;
  const postData = await drinkModel.addComment(
    profile_id,
    rating,
    comment_title,
    comment_review,
    drink_id
  );
  console.log(postData);
  res.sendStatus(200);
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
  !!cocktailName ? res.redirect(url) : res.redirect("/");
});

router.post('/drink/:id', (req, res) => {
  const {
    profile_id,
    drink_id
  } = req.body
  console.log("req body = ", req.body);
  favoriteModel.getUserStuff();
})

module.exports = router;