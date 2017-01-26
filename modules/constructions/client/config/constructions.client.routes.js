(function () {
  'use strict';

  angular
    .module('constructions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('constructions', {
        abstract: true,
        url: '/constructions',
        template: '<ui-view/>'
      })
      .state('constructions.list', {
        url: '',
        templateUrl: 'modules/constructions/client/views/list-constructions.client.view.html',
        controller: 'ConstructionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Constructions List'
        }
      })
      .state('constructions.create', {
        url: '/create',
        templateUrl: 'modules/constructions/client/views/form-construction.client.view.html',
        controller: 'ConstructionsController',
        controllerAs: 'vm',
        resolve: {
          constructionResolve: newConstruction
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Constructions Create'
        }
      })
      .state('constructions.edit', {
        url: '/:constructionId/edit',
        templateUrl: 'modules/constructions/client/views/form-construction.client.view.html',
        controller: 'ConstructionsController',
        controllerAs: 'vm',
        resolve: {
          constructionResolve: getConstruction
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Construction {{ constructionResolve.name }}'
        }
      })
      .state('constructions.view', {
        url: '/:constructionId',
        templateUrl: 'modules/constructions/client/views/view-construction.client.view.html',
        controller: 'ConstructionsController',
        controllerAs: 'vm',
        resolve: {
          constructionResolve: getConstruction
        },
        data: {
          pageTitle: 'Construction {{ constructionResolve.name }}'
        }
      });
  }

  getConstruction.$inject = ['$stateParams', 'ConstructionsService'];

  function getConstruction($stateParams, ConstructionsService) {
    return ConstructionsService.get({
      constructionId: $stateParams.constructionId
    }).$promise;
  }

  newConstruction.$inject = ['ConstructionsService'];

  function newConstruction(ConstructionsService) {
    return new ConstructionsService();
  }
}());
