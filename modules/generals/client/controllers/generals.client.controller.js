(function () {
  'use strict';

  // Generals controller
  angular
    .module('generals')
    .controller('GeneralsController', GeneralsController);

  GeneralsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'generalResolve'];

  function GeneralsController ($scope, $state, $window, Authentication, general) {
    var vm = this;

    vm.authentication = Authentication;
    vm.general = general;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.saveToApprove = function(isValid){
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.generalForm');
        return false;
      }
      vm.general.status = 'waiting for approve';
      vm.save(true);
    }

    vm.approved = function(){
      
      vm.general.status = 'approved';
      vm.save(true);
    }

    vm.rejected = function(){
      
      vm.general.status = 'rejected';
      vm.save(true);
    }

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
