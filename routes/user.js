const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  userModel = require("../models/userModel");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
