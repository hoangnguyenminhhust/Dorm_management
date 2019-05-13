'use strict';

var mongoose = require('mongoose'),
  user = mongoose.model('user');

//   find by id 
exports.read_a_user = function (req, res) {

    user.findById(req.params.userId, function (err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };


// update by id
exports.update_a_user = function (req, res) {

    user.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };
  
//   delete by id
exports.delete_a_user = function (req, res) {

    user.remove({
      _id: req.params.userId
    }, function (err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'user successfully deleted' });
    });
  };
  