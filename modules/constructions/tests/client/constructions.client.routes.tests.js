(function () {
  'use strict';

  describe('Constructions Route Tests', function () {
    // Initialize global variables
    var $scope,
      ConstructionsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ConstructionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ConstructionsService = _ConstructionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('constructions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/constructions');
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
          ConstructionsController,
          mockConstruction;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('constructions.view');
          $templateCache.put('modules/constructions/client/views/view-construction.client.view.html', '');

          // create mock Construction
          mockConstruction = new ConstructionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Construction Name'
          });

          // Initialize Controller
          ConstructionsController = $controller('ConstructionsController as vm', {
            $scope: $scope,
            constructionResolve: mockConstruction
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:constructionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.constructionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            constructionId: 1
          })).toEqual('/constructions/1');
        }));

        it('should attach an Construction to the controller scope', function () {
          expect($scope.vm.construction._id).toBe(mockConstruction._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/constructions/client/views/view-construction.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ConstructionsController,
          mockConstruction;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('constructions.create');
          $templateCache.put('modules/constructions/client/views/form-construction.client.view.html', '');

          // create mock Construction
          mockConstruction = new ConstructionsService();

          // Initialize Controller
          ConstructionsController = $controller('ConstructionsController as vm', {
            $scope: $scope,
            constructionResolve: mockConstruction
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.constructionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/constructions/create');
        }));

        it('should attach an Construction to the controller scope', function () {
          expect($scope.vm.construction._id).toBe(mockConstruction._id);
          expect($scope.vm.construction._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/constructions/client/views/form-construction.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ConstructionsController,
          mockConstruction;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('constructions.edit');
          $templateCache.put('modules/constructions/client/views/form-construction.client.view.html', '');

          // create mock Construction
          mockConstruction = new ConstructionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Construction Name'
          });

          // Initialize Controller
          ConstructionsController = $controller('ConstructionsController as vm', {
            $scope: $scope,
            constructionResolve: mockConstruction
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:constructionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.constructionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            constructionId: 1
          })).toEqual('/constructions/1/edit');
        }));

        it('should attach an Construction to the controller scope', function () {
          expect($scope.vm.construction._id).toBe(mockConstruction._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/constructions/client/views/form-construction.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
