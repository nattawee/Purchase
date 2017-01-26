(function () {
  'use strict';

  angular
    .module('constructions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'จัดจ้างทั่วไป',
      state: 'constructions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'constructions', {
      title: 'List Constructions',
      state: 'constructions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'constructions', {
      title: 'Create Construction',
      state: 'constructions.create',
      roles: ['user']
    });
  }
}());
