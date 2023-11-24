var express = require("express");
var router = express.Router();
//const middleware = require("../middleware/middleware");

router

  .use('/user', require('./users' ))
  .use('/character', require('./characters'))
  .use("/spells", require("./spells"))
  .use('/spellbook', require('./spellbooks'))
  .use("/", require("./swagger"));

module.exports = router;
