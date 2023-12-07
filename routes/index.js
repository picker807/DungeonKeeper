var express = require("express");
var router = express.Router();
const { requiresAuth } = require("express-openid-connect");

if (process.env.NODE_ENV !== 'test') {
    router
        .use('/user', requiresAuth(), require('./users'))
        .use("/character", requiresAuth(), require("./characters"))
        .use("/spells", requiresAuth(), require("./spells"))
        .use("/spellbook", requiresAuth(), require("./spellbooks"))
        .use("/", requiresAuth(), require("./swagger"));
} else {
    router.use('/user', require('./users'))
        .use("/character", require("./characters"))
        .use("/spells", require("./spells"))
        .use("/spellbook", require("./spellbooks"))
        .use("/", require("./swagger"));
}

module.exports = router;
