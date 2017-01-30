(function () {
  'use strict';

  describe('Acquisitions Controller Tests', function () {
    // Initialize global variables
    var AcquisitionsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      AcquisitionsService,
      mockAcquisition;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _AcquisitionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      AcquisitionsService = _AcquisitionsService_;

      // create mock Acquisition
      mockAcquisition = new AcquisitionsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Acquisition Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Acquisitions controller.
      AcquisitionsController = $controller('AcquisitionsController as vm', {
        $scope: $scope,
        acquisitionResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleAcquisitionPostData;

      beforeEach(function () {
        // Create a sample Acquisition object
        sampleAcquisitionPostData = new AcquisitionsService({
          name: 'Acquisition Name'
        });

        $scope.vm.acquisition = sampleAcquisitionPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (AcquisitionsService) {
        // Set POST response
        $httpBackend.expectPOST('api/acquisitions', sampleAcquisitionPostData).respond(mockAcquisition);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Acquisition was created
        expect($state.go).toHaveBeenCalledWith('acquisitions.view', {
          acquisitionId: mockAcquisition._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/acquisitions', sampleAcquisitionPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Acquisition in $scope
        $scope.vm.acquisition = mockAcquisition;
      });

      it('should update a valid Acquisition', inject(function (AcquisitionsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/acquisitions\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('acquisitions.view', {
          acquisitionId: mockAcquisition._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (AcquisitionsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/acquisitions\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Acquisitions
        $scope.vm.acquisition = mockAcquisition;
      });

      it('should delete the Acquisition and redirect to Acquisitions', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/acquisitions\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('acquisitions.list');
      });

      it('should should not delete the Acquisition and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
