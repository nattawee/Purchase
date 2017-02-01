(function () {
  'use strict';

  // Constructions controller
  angular
    .module('constructions')
    .controller('ConstructionsController', ConstructionsController);

  ConstructionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'constructionResolve'];

  function ConstructionsController($scope, $state, $window, Authentication, construction) {
    var vm = this;

    vm.authentication = Authentication;
    vm.construction = construction;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.setData = setData;
    vm.init = init;



    function setData() {
      if (vm.construction._id) {
        if (vm.construction.webbam.datesub) {
          vm.construction.webbam.datesub = new Date(vm.construction.webbam.datesub);
        }

        if (vm.construction.webbam.onweb) {
          vm.construction.webbam.onweb = new Date(vm.construction.webbam.onweb);
        }

        if (vm.construction.ncc.nccdate) {
          vm.construction.ncc.nccdate = new Date(vm.construction.ncc.nccdate);
        }

        if (vm.construction.estimate.dateest) {
          vm.construction.estimate.dateest = new Date(vm.construction.estimate.dateest);
        }

        if (vm.construction.adjust.dateadj) {
          vm.construction.adjust.dateadj = new Date(vm.construction.adjust.dateadj);
        }

      }
    }

    function init() {

      vm.setData();

    }


    // Remove existing Construction
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.construction.$remove($state.go('constructions.list'));
      }
    }

    // Save Construction
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.constructionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.construction._id) {
        vm.construction.$update(successCallback, errorCallback);
      } else {
        vm.construction.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('constructions.list', {
          constructionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
} ());
