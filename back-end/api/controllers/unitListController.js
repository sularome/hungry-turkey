'use strict';


var mongoose = require('mongoose'),
Unit = mongoose.model('Unit');

exports.list_all_units = function(req, res) {
  Unit.find({}, function(err, unit) {
    if (err)
      res.send(err);
    res.json(unit);
  });
};

exports.create_a_unit = function(req, res) {
  var new_unit = new Unit(req.body);
  new_unit.save(function(err, unit) {
    if (err)
      res.send(err);
    res.json(unit);
  });
};

exports.read_a_unit = function(req, res) {
  Unit.findById(req.params.unitId, function(err, unit) {
    if (err)
      res.send(err);
    res.json(unit);
  });
};

exports.update_a_unit = function(req, res) {
  Unit.findOneAndUpdate({_id: req.params.unitId}, req.body, {new: true}, function(err, unit) {
    if (err)
      res.send(err);
    res.json(unit);
  });
};

exports.delete_a_unit = function(req, res) {
  Unit.remove({
    _id: req.params.unitId
  }, function(err, unit) {
    if (err)
      res.send(err);
    res.json({ message: 'Unit successfully deleted' });
  });
};