const db = require('../models');
const Character = db.character;

// Create a new Character
async function createCharacter(req, res, next) {

    const character = new Character(req.body);

    character
        .save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while creating the character.'
                });
            } else {
                next(err);
            }
        });
}

// Get all Characters
async function getAllCharacters(req, res, next) {

    Character
        .find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while updating the character.'
                });
            } else {
                next(err);
            }
        });
}

// Get a Character by ID
async function getOneCharacter(req, res, next) {
    const id = req.params.id;
    Character
        .find({ _id: id })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
};


// Update a Character
async function updateCharacter(req, res, next) {
    try {
        const id = req.params.id;
            Character
            .updateOne({ _id: id }, { $set: req.body })
            .then((data) => {
                res.status(204).send(data);
            })
    } catch (err) {
        console.error("Validation Error:", error.errors)
        next(err);
    }

}

// Delete a Character
async function deleteCharacter(req, res) {
    const id = req.params.id;
    Character
        .deleteOne({ _id: id })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            next(err);
        });
}


module.exports = {
    createCharacter,
    getAllCharacters,
    getOneCharacter,
    updateCharacter,
    deleteCharacter
}