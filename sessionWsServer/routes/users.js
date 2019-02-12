var express = require("express");
var router = express.Router();

const authMW = require("../service/acl/auth-mw");
router.use(authMW);

/* GET users listing. */
router.get("/me/123", function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

/* GET users listing. */
router.get("/restricted", function(req, res, next) {
  res.json({ STATUS: "You're in" });
  next();
});

module.exports = router;
