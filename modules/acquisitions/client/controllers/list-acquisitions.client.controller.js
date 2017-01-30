(function () {
  'use strict';

  angular
    .module('acquisitions')
    .controller('AcquisitionsListController', AcquisitionsListController);

  AcquisitionsListController.$inject = ['AcquisitionsService', 'Authentication'];

  function AcquisitionsListController(AcquisitionsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.acquisitions = AcquisitionsService.query();
  }
} ());
