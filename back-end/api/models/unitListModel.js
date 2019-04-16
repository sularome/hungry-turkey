'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UnitSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the unit'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    deleted: Boolean
});

module.exports = mongoose.model('Unit', UnitSchema);