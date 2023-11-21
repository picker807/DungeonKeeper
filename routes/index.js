var express = require("express");
var router = express.Router();
//const middleware = require("../middleware/middleware");

router

  .use('/users', require('./users' ))
  .use('/characters', require('./characters'))
  .use("/spells", require("./spells"))
  .use('/spellbooks', require('./spellbooks'))
  .use("/", require("./swagger"));

module.exports = router;
