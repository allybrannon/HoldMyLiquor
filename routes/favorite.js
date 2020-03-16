const express = require("express"),
    router = express.Router(),
    drinkModel = require("../models/drinkModel"),
    favoriteModel = require('../models/favoriteModel');

router.get("/:profile_id", async (req, res) => {
    const {profile_id} = req.params;
    const drinkData = await favoriteModel.getUserFavorites(profile_id)
    console.log(drinkData)
    res.render("template", {
        locals: {
            title: "Profile Page",
            sessionData: req.session,
            drinkData: drinkData
        },
        partials: {
            partial: "partial-profile"
        }
    })
})


module.exports = router
