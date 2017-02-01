(function () {
  'use strict';

  describe('Safekeeps Route Tests', function () {
    // Initialize global variables
    var $scope,
      SafekeepsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SafekeepsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SafekeepsService = _SafekeepsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('safekeeps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/safekeeps');
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
          SafekeepsController,
          mockSafekeep;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('safekeeps.view');
          $templateCache.put('modules/safekeeps/client/views/view-safekeep.client.view.html', '');

          // create mock Safekeep
          mockSafekeep = new SafekeepsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Safekeep Name'
          });

          // Initialize Controller
          SafekeepsController = $controller('SafekeepsController as vm', {
            $scope: $scope,
            safekeepResolve: mockSafekeep
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:safekeepId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.safekeepResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            safekeepId: 1
          })).toEqual('/safekeeps/1');
        }));

        it('should attach an Safekeep to the controller scope', function () {
          expect($scope.vm.safekeep._id).toBe(mockSafekeep._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/safekeeps/client/views/view-safekeep.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SafekeepsController,
          mockSafekeep;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('safekeeps.create');
          $templateCache.put('modules/safekeeps/client/views/form-safekeep.client.view.html', '');

          // create mock Safekeep
          mockSafekeep = new SafekeepsService();

          // Initialize Controller
          SafekeepsController = $controller('SafekeepsController as vm', {
            $scope: $scope,
            safekeepResolve: mockSafekeep
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.safekeepResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/safekeeps/create');
        }));

        it('should attach an Safekeep to the controller scope', function () {
          expect($scope.vm.safekeep._id).toBe(mockSafekeep._id);
          expect($scope.vm.safekeep._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/safekeeps/client/views/form-safekeep.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SafekeepsController,
          mockSafekeep;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('safekeeps.edit');
          $templateCache.put('modules/safekeeps/client/views/form-safekeep.client.view.html', '');

          // create mock Safekeep
          mockSafekeep = new SafekeepsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Safekeep Name'
          });

          // Initialize Controller
          SafekeepsController = $controller('SafekeepsController as vm', {
            $scope: $scope,
            safekeepResolve: mockSafekeep
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:safekeepId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.safekeepResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            safekeepId: 1
          })).toEqual('/safekeeps/1/edit');
        }));

        it('should attach an Safekeep to the controller scope', function () {
          expect($scope.vm.safekeep._id).toBe(mockSafekeep._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/safekeeps/client/views/form-safekeep.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
