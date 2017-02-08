'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$http', '$filter', 'Admin', 'Authentication',
  function ($scope, $http, $filter, Admin, Authentication) {
    // Authentication.query(function (res) {
    //   $scope.authentication = res;
    // });
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };

    // $scope.signup = function () {
    //   $http.post('/api/auth/signup', $scope.credentials).success(function () {
    //     // If successful we assign the response to the global user model
    //     // $scope.authentication.user = response;

    //     // And redirect to the previous or home page
    //   });
    // };
  }


]);
