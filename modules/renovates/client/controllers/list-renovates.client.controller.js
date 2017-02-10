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
      uriref: 'renovates.edit({ renovateId: property._id })'
    },
    {
      renovate: 1,
      name: 'รออนุมัติ',
      status: 'waiting for approve',
      uriref: 'renovates.view({ renovateId: property._id })'
    },
    {
      renovate: 2,
      name: 'อนุมัติ',
      status: 'approved',
      uriref: 'renovates.view({ renovateId: property._id })'
    },
    {
      renovate: 3,
      name: 'รอแก้ไข',
      status: 'rejected',
      uriref: 'renovates.edit({ renovateId: property._id })'
    },
    {
      renovate: 4,
      name: 'เสร็จสมบูรณ์ 1',
      status: 'precompleted',
      uriref: 'generals.view({ generalId: general._id })'
    },
    {
      renovate: 5,
      name: 'เสร็จสมบูรณ์ 2',
      status: 'completed',
      uriref: 'generals.view({ generalId: general._id })'
    }];
  }
}());
