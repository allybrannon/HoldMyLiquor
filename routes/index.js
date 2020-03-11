const express = require("express"),
  router = express.Router(),
  drinkModel = require("../models/drinkModel");


/* GET home page. */
router.get("/", async (req, res) => {
  const drinkData = await drinkModel.getOneCocktail();

  res.render("template", {
    locals: {
      title: "HOME",
      drinkData: drinkData
    },
    partials: {
      partial: "partial-index"
    }
  });
});



router.get("/search/:cocktailName?", async (req, res) => {
  const {
    cocktailName
  } = req.params;
  const drinkData = await drinkModel.searchCocktails(cocktailName);
  console.log('DRINK DATA =', drinkData)

  res.render("template", {
    locals: {
      title: "Results Page",
      drinkData: drinkData
    },
    partials: {
      partial: "partial-result"
    }
  });
});


router.post('/search', async (req, res) => {
  const {
    cocktailName
  } = req.body;
  console.log('POST DATA =', cocktailName)
  const url = `/search/${cocktailName}`;
  if (!!cocktailName) {
    res.redirect(url);
  } else {
    res.redirect('/');
  }

})



module.exports = router;