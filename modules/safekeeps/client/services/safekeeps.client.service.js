// Safekeeps service used to communicate Safekeeps REST endpoints
(function () {
  'use strict';

  angular
    .module('safekeeps')
    .factory('SafekeepsService', SafekeepsService);

  SafekeepsService.$inject = ['$resource'];

  function SafekeepsService($resource) {
    return $resource('api/safekeeps/:safekeepId', {
      safekeepId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
