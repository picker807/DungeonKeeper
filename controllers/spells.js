const mongoose = require("mongoose");

const getAllSpells = async (req, res, next) => {
  try {
    const spells = await mongoose.connection
      .collection("spells")
      .find({})
      .toArray();
    if (spells.length == 0) {
      console.log("no people found");
    }
    res.status(200).json(people);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllSpells };
