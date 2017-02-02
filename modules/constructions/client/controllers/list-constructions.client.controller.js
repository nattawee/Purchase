(function () {
  'use strict';

  angular
    .module('constructions')
    .controller('ConstructionsListController', ConstructionsListController);

  ConstructionsListController.$inject = ['ConstructionsService', 'Authentication'];

  function ConstructionsListController(ConstructionsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;    
    vm.constructions = ConstructionsService.query();
  }
} ());
