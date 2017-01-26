// Constructions service used to communicate Constructions REST endpoints
(function () {
  'use strict';

  angular
    .module('constructions')
    .factory('ConstructionsService', ConstructionsService);

  ConstructionsService.$inject = ['$resource'];

  function ConstructionsService($resource) {
    return $resource('api/constructions/:constructionId', {
      constructionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
