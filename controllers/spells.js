const db = require("../models");
const Spell = db.spell;

// Create new spell
const createSpell = async (req, res, next) => {
    const spell = new Spell(req.body);

    spell
        .save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: er.message || 'An error occured while creating the spell'
                });
            } else {
                next(err);
            }
        });
}

// Get all spells
const getAllSpells = async (req, res, next) => {

    Spell
        .find({})
        .then((data) => {
            console.log(data);
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

// Get a spell by ID
async function getSpellById(req, res, next) {
    const id = req.params.id;
    Spell
        .find({ _id: id })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
};

// Update a spell
async function updateSpell(req, res, next) {
    try {
        const id = req.params.id;

        const validationError = await User.validate(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }

        Spell
            .updateOne({ _id: id }, { $set: req.body })
            .then((data) => {
                res.status(204).send(data);
            })
    } catch (err) {
        next(err);
    }

}

// Delete a spell
async function deleteSpell(req, res) {
    const id = req.params.id;
    Spell
        .deleteOne({ _id: id })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    createSpell,
    getAllSpells,
    getSpellById,
    updateSpell,
    deleteSpell
};
