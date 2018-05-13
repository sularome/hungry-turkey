'use strict';
module.exports = function(app) {
  var ingredientsList = require('../controllers/ingredientListController');

  // ingredientsList Routes
  app.route('/ingredients')
    .get(ingredientsList.list_all_ingredients)
    .post(ingredientsList.create_a_ingredient);


  app.route('/ingredients/:ingredientId')
    .get(ingredientsList.read_a_ingredient)
    .put(ingredientsList.update_a_ingredient)
    .delete(ingredientsList.delete_a_ingredient);
};