(function () {
  'use strict';

  angular
    .module('clients')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Clients',
      state: 'clients',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'clients', {
      title: 'List Clients',
      state: 'clients.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'clients', {
      title: 'Create Client',
      state: 'clients.create',
      roles: ['user']
    });
  }
}());
