'use strict';

/**
 * Module dependencies
 */
var acquisitionsPolicy = require('../policies/acquisitions.server.policy'),
  acquisitions = require('../controllers/acquisitions.server.controller');

module.exports = function(app) {
  // Acquisitions Routes
  app.route('/api/acquisitions').all(acquisitionsPolicy.isAllowed)
    .get(acquisitions.list)
    .post(acquisitions.create);

  app.route('/api/acquisitions/:acquisitionId').all(acquisitionsPolicy.isAllowed)
    .get(acquisitions.read)
    .put(acquisitions.update)
    .delete(acquisitions.delete);

  // Finish by binding the Acquisition middleware
  app.param('acquisitionId', acquisitions.acquisitionByID);
};
