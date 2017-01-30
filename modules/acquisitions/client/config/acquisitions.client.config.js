(function () {
  'use strict';

  angular
    .module('acquisitions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Acquisitions',
      state: 'acquisitions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'acquisitions', {
      title: 'List Acquisitions',
      state: 'acquisitions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'acquisitions', {
      title: 'Create Acquisition',
      state: 'acquisitions.create',
      roles: ['user']
    });
  }
}());
