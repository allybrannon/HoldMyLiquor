const express = require("express"),
    router = express.Router(),
    drinkModel = require("../models/drinkModel"),
    favoriteModel = require("../models/favoriteModel");


router.get("/:id?", async (req, res) => {
    const { id } = req.params;
    const profileData = await favoriteModel.getUserProfile(id);
    let getDrinkIds = [],
        drinkData = [];
    if (!!req.session.is_logged_in) {
        getDrinkIds = await favoriteModel.getUserFavorites(profile_id);
        drinkData = getDrinkIds.map(async favorite => {
            await drinkModel.getOneCocktail(favorite.drink_id)
        });
    }

    drinkData = getDrinkIds[0].map(async favorite => {
        await drinkModel.getOneCocktail(favorite.drink_id)
    })

    console.log(drinkData);

    res.render("template", {
        locals: {
            title: "Profile Page",
            sessionData: req.session,
            profileData: profileData,
            drinkData: drinkData
        },
        partials: {
            partial: "partial-profile"
        }
    });
});

module.exports = router;
