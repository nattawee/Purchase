'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Construction = mongoose.model('Construction'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Construction
 */
exports.create = function(req, res) {
  var construction = new Construction(req.body);
  construction.user = req.user;

  construction.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(construction);
    }
  });
};

/**
 * Show the current Construction
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var construction = req.construction ? req.construction.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  construction.isCurrentUserOwner = req.user && construction.user && construction.user._id.toString() === req.user._id.toString();

  res.jsonp(construction);
};

/**
 * Update a Construction
 */
exports.update = function(req, res) {
  var construction = req.construction;

  construction = _.extend(construction, req.body);

  construction.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(construction);
    }
  });
};

/**
 * Delete an Construction
 */
exports.delete = function(req, res) {
  var construction = req.construction;

  construction.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(construction);
    }
  });
};

/**
 * List of Constructions
 */
exports.list = function(req, res) {
  Construction.find().sort('-created').populate('user', 'displayName').exec(function(err, constructions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(constructions);
    }
  });
};

/**
 * Construction middleware
 */
exports.constructionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Construction is invalid'
    });
  }

  Construction.findById(id).populate('user', 'displayName').exec(function (err, construction) {
    if (err) {
      return next(err);
    } else if (!construction) {
      return res.status(404).send({
        message: 'No Construction with that identifier has been found'
      });
    }
    req.construction = construction;
    next();
  });
};
