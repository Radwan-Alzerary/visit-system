const router = require("express").Router();
const isfulladmin = require("../config/auth").isfulladmin;
const isCashire = require("../config/auth").isCashire;
const ensureAuthenticated = require("../config/auth").userlogin;

router.use("/admin", require("./users"));
router.use("/visit", require("./visit"));
router.use("/", require("./routes"));

module.exports = router;
