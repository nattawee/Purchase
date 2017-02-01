(function () {
  'use strict';

  angular
    .module('safekeeps')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('safekeeps', {
        abstract: true,
        url: '/safekeeps',
        template: '<ui-view/>'
      })
      .state('safekeeps.list', {
        url: '',
        templateUrl: 'modules/safekeeps/client/views/list-safekeeps.client.view.html',
        controller: 'SafekeepsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Safekeeps List'
        }
      })
      .state('safekeeps.create', {
        url: '/create',
        templateUrl: 'modules/safekeeps/client/views/form-safekeep.client.view.html',
        controller: 'SafekeepsController',
        controllerAs: 'vm',
        resolve: {
          safekeepResolve: newSafekeep
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Safekeeps Create'
        }
      })
      .state('safekeeps.edit', {
        url: '/:safekeepId/edit',
        templateUrl: 'modules/safekeeps/client/views/form-safekeep.client.view.html',
        controller: 'SafekeepsController',
        controllerAs: 'vm',
        resolve: {
          safekeepResolve: getSafekeep
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Safekeep {{ safekeepResolve.name }}'
        }
      })
      .state('safekeeps.view', {
        url: '/:safekeepId',
        templateUrl: 'modules/safekeeps/client/views/view-safekeep.client.view.html',
        controller: 'SafekeepsController',
        controllerAs: 'vm',
        resolve: {
          safekeepResolve: getSafekeep
        },
        data: {
          pageTitle: 'Safekeep {{ safekeepResolve.name }}'
        }
      });
  }

  getSafekeep.$inject = ['$stateParams', 'SafekeepsService'];

  function getSafekeep($stateParams, SafekeepsService) {
    return SafekeepsService.get({
      safekeepId: $stateParams.safekeepId
    }).$promise;
  }

  newSafekeep.$inject = ['SafekeepsService'];

  function newSafekeep(SafekeepsService) {
    return new SafekeepsService();
  }
}());
