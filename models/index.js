const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.Promise = global.Promise;

dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.githubClientId = process.env.GITHUB_CLIENT_ID;
db.githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
db.spell = require("./spell.js");
db.user = require('./user.js');
db.character = require("./character.js");
db.spellbook = require("./spellbook.js");

module.exports = db;
