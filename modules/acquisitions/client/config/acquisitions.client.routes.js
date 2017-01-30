(function () {
  'use strict';

  angular
    .module('acquisitions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('acquisitions', {
        abstract: true,
        url: '/acquisitions',
        template: '<ui-view/>'
      })
      .state('acquisitions.list', {
        url: '',
        templateUrl: 'modules/acquisitions/client/views/list-acquisitions.client.view.html',
        controller: 'AcquisitionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Acquisitions List'
        }
      })
      .state('acquisitions.create', {
        url: '/create',
        templateUrl: 'modules/acquisitions/client/views/form-acquisition.client.view.html',
        controller: 'AcquisitionsController',
        controllerAs: 'vm',
        resolve: {
          acquisitionResolve: newAcquisition
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Acquisitions Create'
        }
      })
      .state('acquisitions.edit', {
        url: '/:acquisitionId/edit',
        templateUrl: 'modules/acquisitions/client/views/form-acquisition.client.view.html',
        controller: 'AcquisitionsController',
        controllerAs: 'vm',
        resolve: {
          acquisitionResolve: getAcquisition
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Acquisition {{ acquisitionResolve.name }}'
        }
      })
      .state('acquisitions.view', {
        url: '/:acquisitionId',
        templateUrl: 'modules/acquisitions/client/views/view-acquisition.client.view.html',
        controller: 'AcquisitionsController',
        controllerAs: 'vm',
        resolve: {
          acquisitionResolve: getAcquisition
        },
        data: {
          pageTitle: 'Acquisition {{ acquisitionResolve.name }}'
        }
      });
  }

  getAcquisition.$inject = ['$stateParams', 'AcquisitionsService'];

  function getAcquisition($stateParams, AcquisitionsService) {
    return AcquisitionsService.get({
      acquisitionId: $stateParams.acquisitionId
    }).$promise;
  }

  newAcquisition.$inject = ['AcquisitionsService'];

  function newAcquisition(AcquisitionsService) {
    return new AcquisitionsService();
  }
}());
