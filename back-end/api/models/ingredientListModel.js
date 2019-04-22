'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var IngredientSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the ingredient'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    calories: {
        type: Number,
        required: 'Kindly enter the calories of the ingredient'
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {         type: Number,         default: 0     },
    sugar: {         type: Number,         default: 0     },
    fiber: {         type: Number,         default: 0     },
    fat: {         type: Number,         default: 0     },
    saturated: {         type: Number,         default: 0     },
    monounsaturated: {         type: Number,         default: 0     },
    polyunsaturated: {         type: Number,         default: 0     },
    omega3: {         type: Number,         default: 0     },
    omega6: {         type: Number,         default: 0     },
    transFat: {         type: Number,         default: 0     },
    transformations: [{
        unit: String,
        ratio: Number
    }],
    deleted: Boolean
});

module.exports = mongoose.model('Ingredient', IngredientSchema);