const db = require('../models');
const User = db.user;

// Create a new user
async function createUser(req, res, next) {
    
    console.log(req.body);
    const user = new User(req.body);

    user
        .save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while creating the user.'
                });
            } else {
                next(err);
            }
        });
}

// Get all users
async function getAllUsers(req, res, next) {

    User
        .find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while updating the user.'
                });
            } else {
                next(err);
            }
        });
}

// Get a user by ID
async function getOneUser(req, res, next) {

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


// Update a user
async function updateUser(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id);

        /*const validationError = await User.validate(req.body);
        console.log(validationError);
        if (validationError) {
            console.log("validation error yes");
            return res.status(400).json({ error: validationError.message });
        }*/

        User
            .updateOne({ _id: id }, { $set: req.body })
            .then((data) => {
                res.status(204).send(data);
            })
    } catch (err) {
        next(err);
    }

}

// Delete a user
async function deleteUser(req, res) {
    const id = req.params.id;
    User
        .deleteOne({ _id: id })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            next(err);
        });
}


module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}