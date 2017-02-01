'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Safekeep = mongoose.model('Safekeep'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Safekeep
 */
exports.create = function(req, res) {
  var safekeep = new Safekeep(req.body);
  safekeep.user = req.user;

  safekeep.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(safekeep);
    }
  });
};

/**
 * Show the current Safekeep
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var safekeep = req.safekeep ? req.safekeep.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  safekeep.isCurrentUserOwner = req.user && safekeep.user && safekeep.user._id.toString() === req.user._id.toString();

  res.jsonp(safekeep);
};

/**
 * Update a Safekeep
 */
exports.update = function(req, res) {
  var safekeep = req.safekeep;

  safekeep = _.extend(safekeep, req.body);

  safekeep.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(safekeep);
    }
  });
};

/**
 * Delete an Safekeep
 */
exports.delete = function(req, res) {
  var safekeep = req.safekeep;

  safekeep.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(safekeep);
    }
  });
};

/**
 * List of Safekeeps
 */
exports.list = function(req, res) {
  Safekeep.find().sort('-created').populate('user', 'displayName').exec(function(err, safekeeps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(safekeeps);
    }
  });
};

/**
 * Safekeep middleware
 */
exports.safekeepByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Safekeep is invalid'
    });
  }

  Safekeep.findById(id).populate('user', 'displayName').exec(function (err, safekeep) {
    if (err) {
      return next(err);
    } else if (!safekeep) {
      return res.status(404).send({
        message: 'No Safekeep with that identifier has been found'
      });
    }
    req.safekeep = safekeep;
    next();
  });
};
