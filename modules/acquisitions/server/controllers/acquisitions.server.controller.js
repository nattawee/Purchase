'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Acquisition = mongoose.model('Acquisition'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Acquisition
 */
exports.create = function(req, res) {
  var acquisition = new Acquisition(req.body);
  acquisition.user = req.user;

  acquisition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(acquisition);
    }
  });
};

/**
 * Show the current Acquisition
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var acquisition = req.acquisition ? req.acquisition.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  acquisition.isCurrentUserOwner = req.user && acquisition.user && acquisition.user._id.toString() === req.user._id.toString();

  res.jsonp(acquisition);
};

/**
 * Update a Acquisition
 */
exports.update = function(req, res) {
  var acquisition = req.acquisition;

  acquisition = _.extend(acquisition, req.body);

  acquisition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(acquisition);
    }
  });
};

/**
 * Delete an Acquisition
 */
exports.delete = function(req, res) {
  var acquisition = req.acquisition;

  acquisition.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(acquisition);
    }
  });
};

/**
 * List of Acquisitions
 */
exports.list = function(req, res) {
  Acquisition.find().sort('-created').populate('user', 'displayName').exec(function(err, acquisitions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(acquisitions);
    }
  });
};

/**
 * Acquisition middleware
 */
exports.acquisitionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Acquisition is invalid'
    });
  }

  Acquisition.findById(id).populate('user', 'displayName').exec(function (err, acquisition) {
    if (err) {
      return next(err);
    } else if (!acquisition) {
      return res.status(404).send({
        message: 'No Acquisition with that identifier has been found'
      });
    }
    req.acquisition = acquisition;
    next();
  });
};
