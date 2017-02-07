(function () {
  'use strict';

  angular
    .module('aquisitions')
    .controller('AquisitionsListController', AquisitionsListController);

  AquisitionsListController.$inject = ['AquisitionsService'];

  function AquisitionsListController(AquisitionsService) {
    var vm = this;

    vm.aquisitions = AquisitionsService.query();
  }
}());
