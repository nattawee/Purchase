(function () {
  'use strict';

  // Acquisitions controller
  angular
    .module('acquisitions')
    .controller('AcquisitionsController', AcquisitionsController);

  AcquisitionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'acquisitionResolve'];

  function AcquisitionsController ($scope, $state, $window, Authentication, acquisition) {
    var vm = this;

    vm.authentication = Authentication;
    vm.acquisition = acquisition;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Acquisition
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.acquisition.$remove($state.go('acquisitions.list'));
      }
    }

    // Save Acquisition
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.acquisitionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.acquisition._id) {
        vm.acquisition.$update(successCallback, errorCallback);
      } else {
        vm.acquisition.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('acquisitions.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
