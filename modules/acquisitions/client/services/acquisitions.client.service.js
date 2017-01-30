// Acquisitions service used to communicate Acquisitions REST endpoints
(function () {
  'use strict';

  angular
    .module('acquisitions')
    .factory('AcquisitionsService', AcquisitionsService);

  AcquisitionsService.$inject = ['$resource'];

  function AcquisitionsService($resource) {
    return $resource('api/acquisitions/:acquisitionId', {
      acquisitionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
