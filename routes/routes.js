const router = require("express").Router();
const User = require("../models/user");
const isfulladmin = require("../config/auth").isfulladmin;
const isCashire = require("../config/auth").isCashire;
const ensureAuthenticated = require("../config/auth").userlogin;
const Visit = require("../models/visiter");

router.get("/", ensureAuthenticated, async (req, res) => {
  res.render("dashboard" );
});

router.get("/visitor", async (req, res) => {
  const visits = await Visit.find({registered:true,coming:true}).sort({ enterprise: 1 });
  res.render("visitorList",{visits} );
});



module.exports = router;
