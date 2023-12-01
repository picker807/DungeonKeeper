var express = require("express");
var router = express.Router();
const { requiresAuth } = require("express-openid-connect");
//const middleware = require("../middleware/middleware");

router

  .use("/user", requiresAuth(), require("./users"))
  .use("/character", requiresAuth(), require("./characters"))
  .use("/spells", requiresAuth(), require("./spells"))
  .use("/spellbook", requiresAuth(), require("./spellbooks"))
  .use("/", requiresAuth(), require("./swagger"));

module.exports = router;
