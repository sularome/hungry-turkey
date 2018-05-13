'use strict';


var mongoose = require('mongoose'),
  Ingredient = mongoose.model('Ingredient');

exports.list_all_ingredients = function(req, res) {
  Ingredient.find({}, function(err, ingredient) {
    if (err)
      res.send(err);
    res.json(ingredient);
  });
};

exports.create_a_ingredient = function(req, res) {
  var new_ingredient = new Ingredient(req.body);
  new_ingredient.save(function(err, ingredient) {
    if (err)
      res.send(err);
    res.json(ingredient);
  });
};

exports.read_a_ingredient = function(req, res) {
  Ingredient.findById(req.params.ingredientId, function(err, ingredient) {
    if (err)
      res.send(err);
    res.json(ingredient);
  });
};

exports.update_a_ingredient = function(req, res) {
  Ingredient.findOneAndUpdate({_id: req.params.ingredientId}, req.body, {new: true}, function(err, ingredient) {
    if (err)
      res.send(err);
    res.json(ingredient);
  });
};

exports.delete_a_ingredient = function(req, res) {
  Ingredient.remove({
    _id: req.params.ingredientId
  }, function(err, ingredient) {
    if (err)
      res.send(err);
    res.json({ message: 'Ingredient successfully deleted' });
  });
};