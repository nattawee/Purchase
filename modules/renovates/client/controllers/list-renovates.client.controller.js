(function () {
  'use strict';

  angular
    .module('renovates')
    .controller('RenovatesListController', RenovatesListController);

  RenovatesListController.$inject = ['RenovatesService', 'Authentication'];

  function RenovatesListController(RenovatesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.renovates = RenovatesService.query();
  }
}());
