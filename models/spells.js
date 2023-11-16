const mongoose = require('mongoose');

const spellSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Spell name is required"]
    },
    level: {
        type: Number,
        required: [true, "specify a level"]
    },
    school: {
        type: String,
        trim: true,
        required: [true, "please specify a school"]
    },
    components: {
        type: Array,
        default: [],
        required: [true, "Spell components are required"]
    },
    range: {
        type: String,
        trim: true,
        required: [true, "Range is required"]
    },
    areaOfEffect: {
        type: String,
        trim: true,
        required: [true, "Specify an area of effect"]
    },
    save: {
        type: String,
        trim: true,
        required: [true, "saving throw info required"]
    },
    castingTime: {
        type: String,
        trim: true,
        required: [true, "Enter a casting time"]
    },
    duration: {
        type: String,
        trim: true,
        required: [true, "duration is required"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please provide a description"]
    }
});

module.exports = mongoose.model('spells', spellSchema);