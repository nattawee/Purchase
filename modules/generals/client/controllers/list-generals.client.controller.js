(function () {
  'use strict';

  angular
    .module('generals')
    .controller('GeneralsListController', GeneralsListController);

  GeneralsListController.$inject = ['GeneralsService', 'Authentication'];

  function GeneralsListController(GeneralsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.generals = GeneralsService.query(function (generals) {
    vm.dataList = [];
      generals.forEach(function (general) {
        var data = {
          date: new Date(general.trnsdate).toLocaleDateString(),
          item: general.itemdesc,
          brunch: general.department.name,
          owner: general.owner,
          docno: general.docno,
          amount: general.estexpense.amount,
          apprvdate: new Date(general.estexpense ? general.estexpense.apprvdate : '').toLocaleDateString(),
          approver: general.estexpense.approver,
          processtype: general.processtype,
          methodtype: general.methodtype,
          requestdate: new Date(general.announcement ? general.announcement.requestdate : '').toLocaleDateString(),
          onlinedate: new Date(general.announcement ? general.announcement.onlinedate : '').toLocaleDateString(),
          reference: (general.announcement ? general.announcement.reference : ''),
          pamount: general.purchase.amount,
          papprvdate: new Date(general.purchase ? general.purchase.apprvdate : '').toLocaleDateString(),
          papprover: general.purchase.approver,
          supplier: general.supplier,
          refno: general.refno,
          naccdocdate: new Date(general.nacc ? general.nacc.naccdocdate : '').toLocaleDateString(),
          naccdocno: (general.nacc ? general.nacc.naccdocno : '')
        };
        vm.dataList.push(data);

      });
    });
    // vm.dataList = [
    //   {
    //     id: 1,
    //     name: 'github',
    //     price: '200$',
    //     publisher: {
    //       name: 'dtagdev'
    //     }
    //   },
    //   {
    //     id: 2,
    //     name: 'google',
    //     price: '300$',
    //     publisher: {
    //       name: 'dtagvn'
    //     }
    //   }
    // ];
    vm.tabs = [{
      renovate: 0,
      name: 'แบบร่าง',
      status: 'draft',
      uriref: 'generals.edit({ generalId: general._id })'
    },
    {
      renovate: 1,
      name: 'รออนุมัติ',
      status: 'waiting for approve',
      uriref: 'generals.view({ generalId: general._id })'
    },
    {
      renovate: 2,
      name: 'อนุมัติ',
      status: 'approved',
      uriref: 'generals.view({ generalId: general._id })'
    },
    {
      renovate: 3,
      name: 'รอแก้ไข',
      status: 'rejected',
      uriref: 'generals.edit({ generalId: general._id })'
    },
    {
      renovate: 4,
      name: 'เสร็จสมบูรณ์ 1',
      status: 'completed1',
      uriref: 'generals.view({ generalId: general._id })'
    },
    {
      renovate: 5,
      name: 'เสร็จสมบูรณ์ 2',
      status: 'completed2',
      uriref: 'generals.view({ generalId: general._id })'
    }];



  }
} ());
