(function () {
  'use strict';

  // Generals controller
  angular
    .module('generals')
    .controller('GeneralsController', GeneralsController);

  GeneralsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'generalResolve'];

  function GeneralsController($scope, $state, $window, Authentication, general) {
    var vm = this;
    vm.authentication = Authentication;
    vm.general = general;
    if (vm.general.trnsdate) {
      vm.general.trnsdate = new Date(vm.general.trnsdate);
    }
    if (vm.general.estexpense && vm.general.estexpense.apprvdate) {
      vm.general.estexpense.apprvdate = new Date(vm.general.estexpense.apprvdate);
    }
    if (vm.general.purchase && vm.general.purchase.apprvdate) {
      vm.general.purchase.apprvdate = new Date(vm.general.purchase.apprvdate);
    }
    if (vm.general.announcement && vm.general.announcement.requestdate) {
      vm.general.announcement.requestdate = new Date(vm.general.announcement.requestdate);
    }
    if (vm.general.announcement && vm.general.announcement.onlinedate) {
      vm.general.announcement.onlinedate = new Date(vm.general.announcement.onlinedate);
    }
    if (vm.general.nacc && vm.general.nacc.naccdocdate) {
      vm.general.nacc.naccdocdate = new Date(vm.general.nacc.naccdocdate);
    }
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.saveToApprove = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.generalForm');
        return false;
      }
      vm.general.status = 'waiting for approve';
      vm.save(true);
    };

    vm.approved = function () {

      vm.general.status = 'approved';
      vm.save(true);
    };

    vm.rejected = function () {

      vm.general.status = 'rejected';
      vm.save(true);
    };

    // Remove existing General
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.general.$remove($state.go('generals.list'));
      }
    }

    // Save General
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.generalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.general._id) {
        vm.general.$update(successCallback, errorCallback);
      } else {
        vm.general.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('generals.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
