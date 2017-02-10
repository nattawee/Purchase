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
    vm.properties = vm.renovates;
    vm.tabs = [{
      renovate: 0,
      name: 'แบบร่าง',
      status: 'draft',
      uriref: 'properties.edit({ propertyId: property._id })'
    },
    {
      renovate: 1,
      name: 'รออนุมัติ',
      status: 'waiting for approve',
      uriref: 'properties.view({ propertyId: property._id })'
    },
    {
      renovate: 2,
      name: 'อนุมัติ',
      status: 'approved',
      uriref: 'properties.view({ propertyId: property._id })'
    },
    {
      renovate: 3,
      name: 'รอแก้ไข',
      status: 'rejected',
      uriref: 'properties.edit({ propertyId: property._id })'
    },
    {
      renovate: 4,
      name: 'เสร็จสมบูรณ์',
      status: 'completed',
      uriref: 'properties.view({ propertyId: property._id })'
    }];
  }
}());
