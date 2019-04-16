'use strict';
module.exports = function(app) {
  var unitList = require('../controllers/unitListController');

  app.route('/units')
    .get(unitList.list_all_units)
    .post(unitList.create_a_unit);


  app.route('/units/:unitId')
    .get(unitList.read_a_unit)
    .put(unitList.update_a_unit)
    .delete(unitList.delete_a_unit);
};