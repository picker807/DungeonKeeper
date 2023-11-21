const db = require('../models');
const Spellbook = db.spellbook;

// Create a new Spellbook
async function createSpellbook(req, res, next) {

    const spellbook = new Spellbook(req.body);

    spellbook
        .save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while creating the spellbook.'
                });
            } else {
                next(err);
            }
        });
}

// Get all Spellbooks
async function getAllSpellbooks(req, res, next) {

    Spellbook
        .find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while getting the Spellbooks.'
                });
            } else {
                next(err);
            }
        });
}

// Get a Spellbook by ID
async function getOneSpellbook(req, res, next) {
    const id = req.params.id;
    Spellbook
        .find({ _id: id })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
};


// Update a Spellbook
async function updateSpellbook(req, res, next) {
    try {
        const id = req.params.id;

        const validationError = await Spellbook.validate(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }

        Spellbook
            .updateOne({ _id: id }, { $set: req.body })
            .then((data) => {
                res.status(204).send(data);
            })
    } catch (err) {
        next(err);
    }

}

// Delete a Spellbook
async function deleteSpellbook(req, res) {
    const id = req.params.id;
    Spellbook
        .deleteOne({ _id: id })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            next(err);
        });
}


module.exports = {
    createSpellbook,
    getAllSpellbooks,
    getOneSpellbook,
    updateSpellbook,
    deleteSpellbook
}