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
    vm.tabs = [{
      renovate: 0,
      name: 'แบบร่าง',
      status: 'draft',
      uriref: 'generals.edit({ generalId: general._id })'
    },
    {
      renovate: 1,
      name: 'รออนุมัติ',
      status: 'waiting for approve',
      uriref: 'generals.view({ generalId: general._id })'
    },
    {
      renovate: 2,
      name: 'อนุมัติ',
      status: 'approved',
      uriref: 'generals.view({ generalId: general._id })'
    },
    {
      renovate: 3,
      name: 'รอแก้ไข',
      status: 'rejected',
      uriref: 'generals.edit({ generalId: general._id })'
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
} ());
