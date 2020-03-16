const express = require("express"),
  router = express.Router();

router.get("/", function(req, res) {
  res.render("template", {
    locals: {
      title: "About",
      sessionData: req.session
    },
    partials: {
      partial: "partial-about"
    }
  });
});

module.exports = router;
