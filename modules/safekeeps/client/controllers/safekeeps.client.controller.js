(function () {
  'use strict';

  // Safekeeps controller
  angular
    .module('safekeeps')
    .controller('SafekeepsController', SafekeepsController);

  SafekeepsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'safekeepResolve'];

  function SafekeepsController($scope, $state, $window, Authentication, safekeep) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = Authentication.user;
    vm.safekeep = safekeep;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.setData = setData;
    vm.init = init;



    function setData() {
      if (vm.safekeep._id) {
        if (vm.safekeep.webbam.datesub) {
          vm.safekeep.webbam.datesub = new Date(vm.safekeep.webbam.datesub);
        }

        if (vm.safekeep.webbam.onweb) {
          vm.safekeep.webbam.onweb = new Date(vm.safekeep.webbam.onweb);
        }

        if (vm.safekeep.ncc.nccdate) {
          vm.safekeep.ncc.nccdate = new Date(vm.safekeep.ncc.nccdate);
        }

        if (vm.safekeep.estimate.dateest) {
          vm.safekeep.estimate.dateest = new Date(vm.safekeep.estimate.dateest);
        }

        if (vm.safekeep.adjust.dateadj) {
          vm.safekeep.adjust.dateadj = new Date(vm.safekeep.adjust.dateadj);
        }

      }
    }

    function init() {

      vm.setData();

    }

    // Remove existing Safekeep
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.safekeep.$remove($state.go('safekeeps.list'));
      }
    }

    // Save Safekeep
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.safekeepForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.safekeep._id) {
        vm.safekeep.$update(successCallback, errorCallback);
      } else {
        vm.safekeep.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('safekeeps.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
} ());
