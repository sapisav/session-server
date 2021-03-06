const express = require("express");
const router = express.Router();
const ACL = require("../service/acl");

const authMW = require("../service/acl/auth-mw");
router.use(authMW);

// Validate user role mw
router.use((req, res, next) => {
  if (
    req.currentUser.role === ACL.roles.SUPER_ADMIN ||
    req.currentUser.role === ACL.roles.OWNER
  ) {
    
    return next();
  }

  next("Failed due to role mismatch");
});

router.get("/profile", function(req, res, next) {
  res.json({ title: "Express" });
  res.end("ok");
});

module.exports = router;
