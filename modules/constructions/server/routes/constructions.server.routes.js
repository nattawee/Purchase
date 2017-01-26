'use strict';

/**
 * Module dependencies
 */
var constructionsPolicy = require('../policies/constructions.server.policy'),
  constructions = require('../controllers/constructions.server.controller');

module.exports = function(app) {
  // Constructions Routes
  app.route('/api/constructions').all(constructionsPolicy.isAllowed)
    .get(constructions.list)
    .post(constructions.create);

  app.route('/api/constructions/:constructionId').all(constructionsPolicy.isAllowed)
    .get(constructions.read)
    .put(constructions.update)
    .delete(constructions.delete);

  // Finish by binding the Construction middleware
  app.param('constructionId', constructions.constructionByID);
};
