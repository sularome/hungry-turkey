'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the recipe'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    ingredients:[
        {type: Schema.Types.ObjectId, ref: 'Ingredient'}
    ],
    deleted: Boolean
});

module.exports = mongoose.model('Recipe', RecipeSchema);