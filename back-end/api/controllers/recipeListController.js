'use strict';


var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

exports.list_all_recipes = function(req, res) {
  // Recipe.find({}, function(err, unit) {
  //   if (err)
  //     res.send(err);
  //   res.json(unit);
  // });
  // Recipe.find({}).populate("ingredients").exec(function(err, recipe) {
    Recipe.aggregate([
      { $match: {} },
      { $lookup: {
          from: 'ingredients', 
          localField: 'ingredients.ingredient', 
          foreignField: '_id', 
          as: 'ingredients.ingredient'
        } 
      },
      { $unwind: "$ingredients.ingredient" },
      {
        $group: {
          _id: "$_id",
          name: { "$last" : "$name"},
          calories: { "$sum": "$ingredients.ingredient.calories" },
          protein: { "$sum": "$ingredients.ingredient.protein" },
          fat: { "$sum": "$ingredients.ingredient.fat" }
        }
      }
    ]).exec(function(err, recipe) {
    if (err)
      res.send(err);
    res.json(recipe);
  });
};

exports.create_a_recipe = function(req, res) {
  var new_recipe = new Recipe(req.body);
  new_recipe.save(function(err, recipe) {
    if (err)
      res.send(err);
    res.json(recipe);
  });
};

exports.read_a_recipe = function(req, res) {
  Recipe.findById(req.params.recipeId, function(err, recipe) {
    if (err)
      res.send(err);
    recipe.ingredients = recipe.ingredients.map(ingredient => {
      return {
        ingredient: ingredient.ingredient ? ingredient.ingredient._id : null,
        amount: ingredient.amount,
        unit: ingredient.unit
      }
    });
    res.json(recipe);
  });
};

exports.update_a_recipe = function(req, res) {
  Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true}, function(err, recipe) {
    if (err)
      res.send(err);
    res.json(recipe);
  });
};

exports.delete_a_recipe = function(req, res) {
  Recipe.remove({
    _id: req.params.recipeId
  }, function(err, recipe) {
    if (err)
      res.send(err);
    res.json({ message: 'Recipe successfully deleted' });
  });
};