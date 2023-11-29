const mongoose = require("mongoose");

const charactersSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Character name is required"],
  },
  class: {
    type: String,
    trim: true,
    required: [true, "Character class is required"],
  },
  level: {
    type: Number,
    required: [true, "Character level is required"],
  },
  spellbook: {
    type: String,
    //type: mongoose.Schema.Types.ObjectId,
    // this needs to match the name of the spellbook model
    //ref: "Spellbook",
    required: [true, "Spellbook is required"],
  },
});

module.exports = mongoose.model("characters", charactersSchema);
