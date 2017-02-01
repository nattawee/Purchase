(function () {
  'use strict';

  angular
    .module('safekeeps')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Safekeeps',
      state: 'safekeeps',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'safekeeps', {
      title: 'List Safekeeps',
      state: 'safekeeps.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'safekeeps', {
      title: 'Create Safekeep',
      state: 'safekeeps.create',
      roles: ['user']
    });
  }
}());
