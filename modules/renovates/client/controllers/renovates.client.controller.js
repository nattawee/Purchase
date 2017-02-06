(function () {
  'use strict';

  // Renovates controller
  angular
    .module('renovates')
    .controller('RenovatesController', RenovatesController);

  RenovatesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'renovateResolve'];

  function RenovatesController ($scope, $state, $window, Authentication, renovate) {
    var vm = this;
    vm.authentication = Authentication;
    vm.renovate = renovate;
    if (vm.renovate.estexpense && vm.renovate.estexpense.apprvdate) {
      vm.renovate.estexpense.apprvdate = new Date(vm.renovate.estexpense.apprvdate);
    }
    if (vm.renovate.purchase && vm.renovate.purchase.apprvdate) {
      vm.renovate.purchase.apprvdate = new Date(vm.renovate.purchase.apprvdate);
    }
    if (vm.renovate.announcement && vm.renovate.announcement.requestdate) {
      vm.renovate.announcement.requestdate = new Date(vm.renovate.announcement.requestdate);
    }
    if (vm.renovate.announcement && vm.renovate.announcement.onlinedate) {
      vm.renovate.announcement.onlinedate = new Date(vm.renovate.announcement.onlinedate);
    }
    if (vm.renovate.nacc && vm.renovate.nacc.naccdocdate) {
      vm.renovate.nacc.naccdocdate = new Date(vm.renovate.nacc.naccdocdate);
    }
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.saveToApprove = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.renovateForm');
        return false;
      }
      vm.renovate.status = 'waiting for approve';
      vm.save(true);
    };

    vm.approved = function () {

      vm.renovate.status = 'approved';
      vm.save(true);
    };

    vm.rejected = function () {

      vm.renovate.status = 'rejected';
      vm.save(true);
    };

    // Remove existing Renovate
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.renovate.$remove($state.go('renovates.list'));
      }
    }

    // Save Renovate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.renovateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.renovate._id) {
        vm.renovate.$update(successCallback, errorCallback);
      } else {
        vm.renovate.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('renovates.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
