const db = require("../models");
const Spell = db.spell;

const getAllSpells = async (req, res, next) => {

    Spell
        .find({})
        .then((data) => {
            console.log("This data:" , data);
            res.send(data);
        })

        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while getting spells.'
                });
            } else {
                next(err);
            }
        });
};

module.exports = { getAllSpells };
