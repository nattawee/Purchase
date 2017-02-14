(function () {
  'use strict';

  angular
    .module('aquisitions')
    .controller('AquisitionsListController', AquisitionsListController);

  AquisitionsListController.$inject = ['AquisitionsService', 'Authentication'];

  function AquisitionsListController(AquisitionsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.aquisitions = AquisitionsService.query();
    vm.tabs = [{
      renovate: 0,
      name: 'แบบร่าง',
      status: 'draft',
      uriref: 'aquisitions.edit({ aquisitionId: aquisition._id })'
    },
      {
        renovate: 1,
        name: 'รออนุมัติ',
        status: 'waiting for approve',
        uriref: 'aquisitions.view({ aquisitionId: aquisition._id })'
      },
      {
        renovate: 2,
        name: 'อนุมัติ',
        status: 'complete',
        uriref: 'aquisitions.view({ aquisitionId: aquisition._id })'
      }];
  }
} ());
