(function () {
  'use strict';

  // Acquisitions controller
  angular
    .module('acquisitions')
    .controller('AcquisitionsController', AcquisitionsController);

  AcquisitionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'acquisitionResolve'];

  function AcquisitionsController($scope, $state, $window, Authentication, acquisition) {
    var vm = this;

    vm.authentication = Authentication;
    vm.acquisition = acquisition;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.calculate1 = calculate1;
    vm.calculate2 = calculate2;
    vm.calculate3 = calculate3;
    vm.calculate4 = calculate4;
    vm.findmaxvalue = findmaxvalue;


    function calculate1() {
      vm.acquisition.nta.ntatotal = ((vm.acquisition.nta.obtaining || 0) * (vm.acquisition.nta.ptyvalue || 0)) / (vm.acquisition.nta.ptvcomapany || 0);
      if (vm.acquisition.nta.obtaining > 0 && vm.acquisition.nta.ptyvalue > 0 && vm.acquisition.nta.ptvcomapany > 0) {
        vm.findmaxvalue(vm.acquisition);
      }
    }

    function calculate2() {
      vm.acquisition.forecast.fortotal = ((vm.acquisition.forecast.entryacq || 0) * (vm.acquisition.forecast.net || 0)) / (vm.acquisition.forecast.totalnet || 0);
      if (vm.acquisition.forecast.entryacq > 0 && vm.acquisition.forecast.net > 0 && vm.acquisition.forecast.totalnet > 0) {
        vm.findmaxvalue(vm.acquisition);
      }
    }

    function calculate3() {
      vm.acquisition.ttvconsider.ttvctotal = (vm.acquisition.ttvconsider.valueofaset || 0) / (vm.acquisition.ttvconsider.issuedost || 0);
      if (vm.acquisition.ttvconsider.valueofaset > 0 && vm.acquisition.ttvconsider.issuedost > 0) {
        vm.findmaxvalue(vm.acquisition);
      }
    }

    function calculate4() {
      vm.acquisition.valuesecur.valuesecur = (vm.acquisition.valuesecur.payment || 0) / (vm.acquisition.valuesecur.companypaid || 0);
      if (vm.acquisition.valuesecur.payment > 0 && vm.acquisition.valuesecur.companypaid > 0) {
        vm.findmaxvalue(vm.acquisition);
      }
    }

    function findmaxvalue(acquisition) {
      var data = acquisition;
      var value1 = 0;
      var value2 = 0;
      var value3 = 0;
      var value4 = 0;
      var result = 0;
      if (data.nta) {
        value1 = data.nta.ntatotal;
      } else {
        value1 = 0;
      }
      if (data.forecast) {
        value2 = data.forecast.fortotal;
      } else {
        value2 = 0;
      }
      if (data.ttvconsider) {
        value3 = data.ttvconsider.ttvctotal;
      } else {
        value3 = 0;
      }
      if (data.valuesecur) {
        value4 = data.valuesecur.valuesecur;
      } else {
        value4 = 0;
      }
      if (value1 > value2) {
        result = value1;
        if (result > value3) {
          result = result;
          if (result > value4) {
            result = result;
          } else {
            result = value4;
          }
        } else {
          result = value3;
          if (result > value4) {
            result = result;
          } else {
            result = value4;
          }
        }
      } else {
        result = value2;
        if (result > value3) {
          result = result;
          if (result > value4) {
            result = result;
          } else {
            result = value4;
          }
        } else {
          result = value3;
          if (result > value4) {
            result = result;
          } else {
            result = value4;
          }
        }
      }
      $scope.maxValue = result;
      vm.acquisition.maximum = $scope.maxValue;

    }


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
} ());
