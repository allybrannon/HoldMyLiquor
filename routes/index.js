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

<<<<<<< HEAD
router.post("/", async function (req, res) {
  console.log("req body:", req.body);
  const profile_id = req.session.profile_id;
  const {
    drink_id,
    comment_title,
    comment_review,
    rating
  } = req.body;
=======
/* POST comments to drink page */
router.post("/", async function(req, res) {
  console.log("req body:", req.body);
  const profile_id = req.session.profile_id;
  const { drink_id, comment_title, comment_review, rating } = req.body;
  const redirectUrl = `/drink/${drink_id}`;
>>>>>>> 3e51ac82f836236f4f13e7ae73345c014d1c64cc
  const postData = await drinkModel.addComment(
    profile_id,
    rating,
    comment_title,
    comment_review,
    drink_id
  );
<<<<<<< HEAD
  if (rating == 5 || rating == 4) {
    const favoriteData = await favoriteModel.getUserStuff(profile_id, drink_id);
  }
  console.log(postData);
  res.sendStatus(200);
=======

  res.redirect(redirectUrl);
>>>>>>> 3e51ac82f836236f4f13e7ae73345c014d1c64cc
});

/* GET Search Results page */
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

/* POST redirect search to Search Results page */
router.post("/search/:cocktailName?", async (req, res) => {
<<<<<<< HEAD
  const {
    cocktailName
  } = req.body;
  const url = `/search/${cocktailName}`;
  !!cocktailName ? res.redirect(url) : res.redirect("/");
=======
  const { cocktailName } = req.body;
  const redirectUrl = `/search/${cocktailName}`;
  !!cocktailName ? res.redirect(redirectUrl) : res.redirect("/");
>>>>>>> 3e51ac82f836236f4f13e7ae73345c014d1c64cc
});



module.exports = router;