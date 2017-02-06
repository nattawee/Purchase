(function () {
  'use strict';

  // Properties controller
  angular
    .module('properties')
    .controller('PropertiesController', PropertiesController);

  PropertiesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'propertyResolve'];

  function PropertiesController ($scope, $state, $window, Authentication, property) {
    var vm = this;

    vm.authentication = Authentication;
    vm.property = property;
    if (vm.property.estexpense && vm.property.estexpense.apprvdate) {
      vm.property.estexpense.apprvdate = new Date(vm.property.estexpense.apprvdate);
    }
    if (vm.property.purchase && vm.property.purchase.apprvdate) {
      vm.property.purchase.apprvdate = new Date(vm.property.purchase.apprvdate);
    }
    if (vm.property.announcement && vm.property.announcement.requestdate) {
      vm.property.announcement.requestdate = new Date(vm.property.announcement.requestdate);
    }
    if (vm.property.announcement && vm.property.announcement.onlinedate) {
      vm.property.announcement.onlinedate = new Date(vm.property.announcement.onlinedate);
    }
    if (vm.property.nacc && vm.property.nacc.naccdocdate) {
      vm.property.nacc.naccdocdate = new Date(vm.property.nacc.naccdocdate);
    }
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.saveToApprove = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.propertyForm');
        return false;
      }
      vm.property.status = 'waiting for approve';
      vm.save(true);
    };

    vm.approved = function () {

      vm.property.status = 'approved';
      vm.save(true);
    };

    vm.rejected = function () {

      vm.property.status = 'rejected';
      vm.save(true);
    };

    // Remove existing Property
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.property.$remove($state.go('properties.list'));
      }
    }

    // Save Property
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.propertyForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.property._id) {
        vm.property.$update(successCallback, errorCallback);
      } else {
        vm.property.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('properties.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
