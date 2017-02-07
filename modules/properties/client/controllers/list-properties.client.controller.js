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
  }
}());
