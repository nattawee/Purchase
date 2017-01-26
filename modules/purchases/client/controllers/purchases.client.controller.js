(function () {
  'use strict';

  // Purchases controller
  angular
    .module('purchases')
    .controller('PurchasesController', PurchasesController);

  PurchasesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'purchaseResolve'];

  function PurchasesController($scope, $state, $window, Authentication, purchase) {
    var vm = this;
    vm.authentication = Authentication;
    vm.purchase = purchase;



    // vm.purchase.ncc.nccdate = vm.purchase.ncc.nccdate ? new Date(vm.purchase.ncc.nccdate) : vm.purchase.ncc.nccdate;
    // vm.purchase.webbam.datesub = vm.purchase.webbam.datesub ? new Date(vm.purchase.webbam.datesub) : vm.purchase.webbam.datesub;
    // vm.purchase.webbam.onweb = vm.purchase.webbam.onweb ? new Date(vm.purchase.webbam.onweb) : vm.purchase.webbam.onweb;


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.setData = setData;
    vm.init = init;
    // vm.selectedProductss = null;
    vm.removeProduct = removeProduct;
    vm.addItem = addItem;
    vm.calculate = calculate;

    var dat = new Date();
    Date.prototype.addDays = function (days) {
      var dat = new Date(vm.purchase.docdate);
      dat.setDate(dat.getDate() + days);
      return dat;
    };

    function setData() {

      if (vm.purchase.drilldate) {
        vm.purchase.docdate = new Date(vm.purchase.docdate);
        vm.purchase.drilldate = new Date(vm.purchase.drilldate);
      } else {
        vm.purchase.docdate = new Date();
        vm.purchase.drilldate = new Date();
      }

      if (!vm.purchase.items) {
        vm.purchase.items = [{
          productcode: '',
          product: '',
          qty: 1
        }];
      }
      if (vm.purchase._id) {
        if (vm.purchase.ncc.nccdate) {
          vm.purchase.ncc.nccdate = new Date(vm.purchase.ncc.nccdate);
        }

        if (vm.purchase.webbam.datesub) {
          vm.purchase.webbam.datesub = new Date(vm.purchase.webbam.datesub);
        }

        if (vm.purchase.webbam.onweb) {
          vm.purchase.webbam.onweb = new Date(vm.purchase.webbam.onweb);
        }

        if(vm.purchase.approvmd.appmdate){
          vm.purchase.approvmd.appmdate = new Date(vm.purchase.approvmd.appmdate);
        }

        if(vm.purchase.approvph.apppdate){
          vm.purchase.approvph.apppdate = new Date(vm.purchase.approvph.apppdate);
        }
      }

    }

    function addItem() {
      vm.purchase.items.push({
        productcode: '',
        product: '',
        qty: 1
      });
    }

    function calculate(product) {
      product.amount = (product.unitprice || 0) * (product.qty || 0);


      vm.purchase.amount = 0;
      vm.purchase.items.forEach(function (itm) {
        vm.purchase.amount += itm.amount || 0;
      });
      vm.purchase.remark = [];
      if (vm.purchase.amount >= 100000) {
        vm.purchase.remark.push('ต้องมีข้อมูลการประกาศ Website BAM');
      }
      if (vm.purchase.amount >= 2000000) {
        vm.purchase.remark.push('ต้องมีข้อมูลคุมสัญญาจากสำนักงาน ป.ป.ช.');
      }

    }

    function init() {

      vm.setData();

    }


    function removeProduct(index) {
      vm.purchase.items.splice(index, 1);
    }
    // Remove existing Purchase
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.purchase.$remove($state.go('purchases.list'));
      }
    }

    // Save Purchase
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.purchaseForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.purchase._id) {
        vm.purchase.$update(successCallback, errorCallback);
      } else {
        vm.purchase.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('purchases.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
} ());
