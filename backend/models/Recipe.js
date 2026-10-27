
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);
