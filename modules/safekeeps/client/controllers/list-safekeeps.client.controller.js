(function () {
  'use strict';

  angular
    .module('safekeeps')
    .controller('SafekeepsListController', SafekeepsListController);

  SafekeepsListController.$inject = ['SafekeepsService', 'Authentication'];

  function SafekeepsListController(SafekeepsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    vm.safekeeps = SafekeepsService.query();
  }
} ());
