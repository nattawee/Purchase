'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Branches Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin','viewer','dataentry','approver', 'superuser'],
    allows: [{
      resources: '/api/branches',
      permissions: '*'
    }, {
      resources: '/api/branches/:branchId',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/branches',
      permissions: ['get']
    }, {
      resources: '/api/branches/:branchId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Branches Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Branch is being processed and the current user created it then allow any manipulation
  if (req.branch && req.user && req.branch.user && req.branch.user.id === req.user.id) {
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
