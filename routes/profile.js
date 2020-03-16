const express = require("express"),
    router = express.Router(),
    favoriteModel = require("../models/favoriteModel");

router.get("/:id?", async (req, res) => {
    const { id } = req.params;
    const profileData = await favoriteModel.getUserProfile(id);
    const drinkData = await favoriteModel.getUserFavorites(id);

    console.log(profileData);
    
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
