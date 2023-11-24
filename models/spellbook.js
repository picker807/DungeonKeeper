const mongoose = require('mongoose');

const spellbookSchema = new mongoose.Schema({
    name: {type: String,
        trim: true,
        required:[true, "Spellbook name is required"]
    },
    spells:{
        type: Array,
        default:[],
        required:[true, "This spellbook needs at least one spell."]
    }
});

    module.exports = mongoose.model('spell-book', spellbookSchema);