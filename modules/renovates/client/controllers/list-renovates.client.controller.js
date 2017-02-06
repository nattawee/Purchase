(function () {
  'use strict';

  angular
    .module('renovates')
    .controller('RenovatesListController', RenovatesListController);

  RenovatesListController.$inject = ['RenovatesService'];

  function RenovatesListController(RenovatesService) {
    var vm = this;

    vm.renovates = RenovatesService.query();
  }
}());
