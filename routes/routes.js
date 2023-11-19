const router = require("express").Router();
const User = require("../models/user");
const isfulladmin = require("../config/auth").isfulladmin;
const isCashire = require("../config/auth").isCashire;
const ensureAuthenticated = require("../config/auth").userlogin;

router.get("/", ensureAuthenticated, async (req, res) => {
  res.render("dashboard" );
});



module.exports = router;
