'use strict';
module.exports = function(app) {
  var recipesList = require('../controllers/recipeListController');

  // recipesList Routes
  app.route('/recipes')
    .get(recipesList.list_all_recipes)
    .post(recipesList.create_a_recipe);


  app.route('/recipes/:recipeId')
    .get(recipesList.read_a_recipe)
    .put(recipesList.update_a_recipe)
    .delete(recipesList.delete_a_recipe);
};