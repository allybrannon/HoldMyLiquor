const express = require("express"),
  router = express.Router(),
  drinkModel = require("../models/drinkModel"),
  favoriteModel = require("../models/favoriteModel");

/* GET home page. */
router.get("/", async (req, res) => {
  let profile_id = req.session.profile_id;
  let favoriteData = [];
  
  if (!!profile_id) {
    favoriteData = await favoriteModel.getFavoritesDrinkDetails(profile_id);
  };

  res.render("template", {
    locals: {
      title: "HOME",
      sessionData: req.session,
      favoriteData: favoriteData
    },
    partials: {
      partial: "partial-index"
    }
  });
});

/* GET drink page. */
router.get("/drink/:id?", async (req, res) => {
  let { id } = req.params;
  let drinkData = await drinkModel.getOneCocktail(id),
    avgRating = await drinkModel.getOneAvgRating(id),
    getComments = await drinkModel.getAllCommentsByID(id),
    ingredientData = [],
    measureData = [];

  console.log(avgRating);

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
      avgRating: avgRating,
      getComments: getComments
    },
    partials: {
      partial: "partial-drink"
    }
  });
});

router.post("/", async function(req, res) {
  console.log("req body:", req.body);
  const profile_id = req.session.profile_id;
  const { drink_id, comment_title, comment_review, rating } = req.body;
  const redirectUrl = `/drink/${drink_id}`;
  const postData = await drinkModel.addComment(
    profile_id,
    rating,
    comment_title,
    comment_review,
    drink_id
  );
  if (rating == 5 || rating == 4) {
    const favoriteData = await favoriteModel.addFavorite(profile_id, drink_id);
  }
  res.redirect(redirectUrl);
  res.sendStatus(200);
});

/* GET Search Results page */
router.get("/search/:cocktailName?", async (req, res) => {
  const { cocktailName } = req.params;
  let searchData = await drinkModel.searchCocktails(cocktailName);

  res.render("template", {
    locals: {
      title: "Results Page",
      searchData: searchData,
      sessionData: req.session
    },
    partials: {
      partial: "partial-result"
    }
  });
});

/* POST redirect search to Search Results page */
router.post("/search/:cocktailName?", async (req, res) => {
  const { cocktailName } = req.body;
  let redirectUrl = `/search/${cocktailName}`;
  try {
    !!cocktailName ? res.redirect(redirectUrl) : res.redirect("/");
  } catch (error) {
    console.error("ERROR: ", error);
    res.redirect("/");
  }
});

/* GET Explore page */
router.get("/explore/:letter?", async (req, res) => {
  let { letter } = req.params;
  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let exploreData = await drinkModel.exploreCocktails(letter);

  res.render("template", {
    locals: {
      title: "Explore",
      sessionData: req.session,
      alphabet: alphabet,
      exploreData: exploreData
    },
    partials: {
      partial: "partial-explore"
    }
  });
});

/* GET Random Results page */
router.get("/random", async (req, res) => {
  let randomCocktail = await drinkModel.getRandomCocktail();
  console.log(randomCocktail);
  let cocktailId = randomCocktail.drinks[0].idDrink;

  res.redirect(`/drink/${cocktailId}`);
});

module.exports = router;
