const express = require("express"),
    router = express.Router(),
    drinkModel = require("../models/drinkModel"),
    favoriteModel = require("../models/favoriteModel");


router.get("/:profile_id?", async (req, res) => {
    const { profile_id } = req.params;
    const profileData = await favoriteModel.getUserProfile(profile_id);
    const favoriteData = await favoriteModel.getFavoritesDrinkDetails(profile_id);
    const commentData = await favoriteModel.getUserComments(profile_id);

    res.render("template", {
        locals: {
            title: "Profile Page",
            sessionData: req.session,
            profileData: profileData,
            favoriteData: favoriteData,
            commentData: commentData
        },
        partials: {
            partial: "partial-profile"
        }
    });
});

module.exports = router;
