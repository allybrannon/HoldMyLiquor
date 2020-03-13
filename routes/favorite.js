const express = require("express"),
    router = express.Router(),
    drinkModel = require("../models/drinkModel"),
    favoriteModel = require('../models/favoriteModel')



router.post("/", async (req, res) => {
    const {
        profile_id,
        drink_id,
    } = req.body;
    const response = await favoriteModel.getUserStuff();
    return response;
});


module.exports = router