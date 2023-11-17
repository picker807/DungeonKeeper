const db = require('../models');
const Character = db.character;

// Create a new character
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

// Get all characters
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

// Get a character by ID
async function getCharacterById(req, res, next) {
    const id = req.params.id;
    User
        .find({ _id: id })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
};


// Update a character
async function updateCharacter(req, res, next) {
    try {
        const id = req.params.id;

        const validationError = await User.validate(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }

        Character
            .updateOne({ _id: id }, { $set: req.body })
            .then((data) => {
                res.status(204).send(data);
            })
    } catch (err) {
        next(err);
    }

}

// Delete a character
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
    getCharacterById,
    updateCharacter,
    deleteCharacter
}