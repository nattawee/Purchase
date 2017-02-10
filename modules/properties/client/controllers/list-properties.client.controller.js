(function () {
  'use strict';

  angular
    .module('properties')
    .controller('PropertiesListController', PropertiesListController);

  PropertiesListController.$inject = ['PropertiesService', 'Authentication'];

  function PropertiesListController(PropertiesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.properties = PropertiesService.query();
    vm.generals = vm.properties;
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
      name: 'เสร็จสมบูรณ์ 1',
      status: 'completed1',
      uriref: 'properties.view({ propertyId: property._id })'
    },
    {
      renovate: 5,
      name: 'เสร็จสมบูรณ์ 2',
      status: 'completed2',
      uriref: 'properties.view({ propertyId: property._id })'
    }];
  }
}());
