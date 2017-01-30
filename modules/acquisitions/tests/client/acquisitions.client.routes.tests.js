(function () {
  'use strict';

  describe('Acquisitions Route Tests', function () {
    // Initialize global variables
    var $scope,
      AcquisitionsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AcquisitionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AcquisitionsService = _AcquisitionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('acquisitions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/acquisitions');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          AcquisitionsController,
          mockAcquisition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('acquisitions.view');
          $templateCache.put('modules/acquisitions/client/views/view-acquisition.client.view.html', '');

          // create mock Acquisition
          mockAcquisition = new AcquisitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Acquisition Name'
          });

          // Initialize Controller
          AcquisitionsController = $controller('AcquisitionsController as vm', {
            $scope: $scope,
            acquisitionResolve: mockAcquisition
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:acquisitionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.acquisitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            acquisitionId: 1
          })).toEqual('/acquisitions/1');
        }));

        it('should attach an Acquisition to the controller scope', function () {
          expect($scope.vm.acquisition._id).toBe(mockAcquisition._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/acquisitions/client/views/view-acquisition.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AcquisitionsController,
          mockAcquisition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('acquisitions.create');
          $templateCache.put('modules/acquisitions/client/views/form-acquisition.client.view.html', '');

          // create mock Acquisition
          mockAcquisition = new AcquisitionsService();

          // Initialize Controller
          AcquisitionsController = $controller('AcquisitionsController as vm', {
            $scope: $scope,
            acquisitionResolve: mockAcquisition
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.acquisitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/acquisitions/create');
        }));

        it('should attach an Acquisition to the controller scope', function () {
          expect($scope.vm.acquisition._id).toBe(mockAcquisition._id);
          expect($scope.vm.acquisition._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/acquisitions/client/views/form-acquisition.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AcquisitionsController,
          mockAcquisition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('acquisitions.edit');
          $templateCache.put('modules/acquisitions/client/views/form-acquisition.client.view.html', '');

          // create mock Acquisition
          mockAcquisition = new AcquisitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Acquisition Name'
          });

          // Initialize Controller
          AcquisitionsController = $controller('AcquisitionsController as vm', {
            $scope: $scope,
            acquisitionResolve: mockAcquisition
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:acquisitionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.acquisitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            acquisitionId: 1
          })).toEqual('/acquisitions/1/edit');
        }));

        it('should attach an Acquisition to the controller scope', function () {
          expect($scope.vm.acquisition._id).toBe(mockAcquisition._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/acquisitions/client/views/form-acquisition.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
