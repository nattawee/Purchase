'use strict';

/**
 * Module dependencies
 */
var safekeepsPolicy = require('../policies/safekeeps.server.policy'),
  safekeeps = require('../controllers/safekeeps.server.controller');

module.exports = function(app) {
  // Safekeeps Routes
  app.route('/api/safekeeps').all(safekeepsPolicy.isAllowed)
    .get(safekeeps.list)
    .post(safekeeps.create);

  app.route('/api/safekeeps/:safekeepId').all(safekeepsPolicy.isAllowed)
    .get(safekeeps.read)
    .put(safekeeps.update)
    .delete(safekeeps.delete);

  // Finish by binding the Safekeep middleware
  app.param('safekeepId', safekeeps.safekeepByID);
};
