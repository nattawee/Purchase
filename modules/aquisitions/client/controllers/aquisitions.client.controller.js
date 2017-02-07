(function () {
  'use strict';

  // Aquisitions controller
  angular
    .module('aquisitions')
    .controller('AquisitionsController', AquisitionsController);

  AquisitionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'aquisitionResolve'];

  function AquisitionsController ($scope, $state, $window, Authentication, aquisition) {
    var vm = this;

    vm.authentication = Authentication;
    vm.aquisition = aquisition;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Aquisition
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.aquisition.$remove($state.go('aquisitions.list'));
      }
    }

    // Save Aquisition
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aquisitionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.aquisition._id) {
        vm.aquisition.$update(successCallback, errorCallback);
      } else {
        vm.aquisition.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('aquisitions.view', {
          aquisitionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
