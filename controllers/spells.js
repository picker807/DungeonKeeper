
const db = require("../models");
const Spell = db.spell;

const getAllSpells = async (req, res, next) => {

    Spell
        .find({})
        .then((data) => {
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

// Create a new Spell
async function createSpell(req, res, next) {
try{
    const spellData = new Spell(req.body);
    Spell.create(spellData).then((createdSpell)=>res.status(201).send(createdSpell))
}catch(err){
    if(err.name === "ValidationError"){
        res.status(400).json({
            message:err.message||"An error occured while inserting your spell. Please try again."
        });
    }else{
        next(err);
    }
}

/*spell
        //.save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while creating the spell.'
                });
            } else {
                next(err);
            }
        });*/
};

// Get a spell by ID
async function getOneSpell(req, res, next) {
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
    getOneSpell,
    updateSpell,
    deleteSpell
}
