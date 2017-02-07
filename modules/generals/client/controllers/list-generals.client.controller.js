(function () {
  'use strict';

  angular
    .module('generals')
    .controller('GeneralsListController', GeneralsListController);

  GeneralsListController.$inject = ['GeneralsService', 'Authentication'];

  function GeneralsListController(GeneralsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.generals = GeneralsService.query();
  }
}());
