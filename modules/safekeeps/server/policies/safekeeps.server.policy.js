'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Safekeeps Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/safekeeps',
      permissions: '*'
    }, {
      resources: '/api/safekeeps/:safekeepId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/safekeeps',
      permissions: ['get', 'post']
    }, {
      resources: '/api/safekeeps/:safekeepId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/safekeeps',
      permissions: ['get']
    }, {
      resources: '/api/safekeeps/:safekeepId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Safekeeps Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Safekeep is being processed and the current user created it then allow any manipulation
  if (req.safekeep && req.user && req.safekeep.user && req.safekeep.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
