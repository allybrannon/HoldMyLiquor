const express = require("express"),
    router = express.Router(),
    drinkModel = require("../models/drinkModel"),
    favoriteModel = require('../models/favoriteModel');




router.get("/user/profile/:${sessionData.profile_id}", async (req, res)=>{
    const drinkDATA = await favoriteModel.getUserFavorites();
   
    res.render("template", {
        locals: {
            title: "Profile Page",
            drinkDATA: drinkDATA
        },
        partials:{
            partial: 'partial-profile'
        }
    })
})


module.exports = router
