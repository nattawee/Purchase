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
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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
        $state.go('renovates.view', {
          renovateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
