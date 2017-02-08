(function () {
  'use strict';

  // Generals controller
  angular
    .module('generals')
    .controller('GeneralsController', GeneralsController);

  GeneralsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'generalResolve', 'BranchesService',];

  function GeneralsController($scope, $state, $window, Authentication, general, BranchesService) {
    var vm = this;
    vm.authentication = Authentication;
    BranchesService.query(function (ret) {
      $scope.branchesService = ret;
    });
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
    if (vm.general.form1 && vm.general.form1.field4.field41) {
      vm.general.form1.field4.field41 = new Date(vm.general.form1.field4.field41);
    }
    if (vm.general.form2 && vm.general.form2.field3.field31) {
      vm.general.form2.field3.field31 = new Date(vm.general.form2.field3.field31);
    }
    if (vm.general.form3 && vm.general.form3.field3.field31) {
      vm.general.form3.field3.field31 = new Date(vm.general.form3.field3.field31);
    }
    if (vm.general.form4 && vm.general.form4.field3.field31) {
      vm.general.form4.field3.field31 = new Date(vm.general.form4.field3.field31);
    }
    if (vm.general.form5 && vm.general.form5.field3.field31) {
      vm.general.form5.field3.field31 = new Date(vm.general.form5.field3.field31);
    }
    if (vm.general.form6 && vm.general.form6.field3.field31) {
      vm.general.form6.field3.field31 = new Date(vm.general.form6.field3.field31);
    }
    if (vm.general.form7 && vm.general.form7.field3.field31) {
      vm.general.form7.field3.field31 = new Date(vm.general.form7.field3.field31);
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

    vm.saveToCompleted = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.generalForm');
        return false;
      }
      vm.general.status = 'completed';
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
} ());
