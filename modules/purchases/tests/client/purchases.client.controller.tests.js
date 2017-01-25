(function () {
  'use strict';

  describe('Purchases Controller Tests', function () {
    // Initialize global variables
    var PurchasesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      PurchasesService,
      mockPurchase,
      mockpurchase,
      mockClient,
      mockProduct,
      arrayProduct;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _PurchasesService_) {
      // Set a new global 
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      PurchasesService = _PurchasesService_;
      // create mock Purchase
      mockPurchase = new PurchasesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Purchase Name'
      });

      arrayProduct = [{
        product: mockProduct,
        qty: 1
      }, {
        product: mockProduct,
        qty: 1,
        unitprice: 100,
        amount: 100,
        vatamount: 7,
        whtamount: 5,
        totalamount: 102
      }];

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Purchases controller.
      PurchasesController = $controller('PurchasesController as vm', {
        $scope: $scope,
        purchaseResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));


    describe('vm.setData() as set', function () {

      beforeEach(function () {
        $scope.vm.purchase.docdate = new Date();
      });

      it('should set Data', inject(function () {
        $scope.vm.setData();

        // Test form inputs are reset
        expect($scope.vm.purchase.docdate).toEqual(new Date($scope.vm.purchase.docdate) || new Date());
        expect($scope.vm.purchase.items.length).toEqual(1);

      }));
    });
    

describe('vm.addItem() as set', function () {

      beforeEach(function () {
        $scope.vm.purchase.docdate = new Date();
        $scope.vm.purchase.items = [{
          productcode: '',
          product: '',
          qty: 1
        }];
      });

      it('should addItem', inject(function () {
        $scope.vm.addItem();

        // Test form inputs are reset
        expect($scope.vm.purchase.docdate).toEqual(new Date($scope.vm.purchase.docdate) || new Date());
        expect($scope.vm.purchase.items.length).toEqual(2);

      }));
    });

    describe('vm.calculate() as set', function () {

      beforeEach(function () {
        $scope.vm.purchase.docdate = new Date();
        $scope.vm.purchase.items = [{
          productcode: '',
          product: '',
          qty: 1,
          unitprice:10000
        }];
      });
      it('should addItem < 100,000', inject(function () {
        $scope.vm.calculate($scope.vm.purchase.items[0]);

        // Test form inputs are reset
        expect($scope.vm.purchase.docdate).toEqual(new Date($scope.vm.purchase.docdate) || new Date());
        expect($scope.vm.purchase.items.length).toEqual(1);
        expect($scope.vm.purchase.items[0].amount).toEqual(10000);
        expect($scope.vm.purchase.amount).toEqual(10000);
        expect($scope.vm.purchase.remark.length).toEqual(0);
        
        

      }));

      it('should addItem >= 100,000 < 2,000,000', inject(function () {
        $scope.vm.purchase.items = [{
          productcode: '',
          product: '',
          qty: 1,
          unitprice:100000
        }];
        $scope.vm.calculate($scope.vm.purchase.items[0]);

        // Test form inputs are reset
        expect($scope.vm.purchase.docdate).toEqual(new Date($scope.vm.purchase.docdate) || new Date());
        expect($scope.vm.purchase.items.length).toEqual(1);
        expect($scope.vm.purchase.items[0].amount).toEqual(100000);
        expect($scope.vm.purchase.amount).toEqual(100000);
        expect($scope.vm.purchase.remark.length).toEqual(1);
        expect($scope.vm.purchase.remark[0]).toEqual('ต้องมีข้อมูลการประกาศ Website BAM');
        

      }));

      it('should addItem >= 2,000,000', inject(function () {
        $scope.vm.purchase.items = [{
          productcode: '',
          product: '',
          qty: 1,
          unitprice:2000000
        }];
        $scope.vm.calculate($scope.vm.purchase.items[0]);

        // Test form inputs are reset
        expect($scope.vm.purchase.docdate).toEqual(new Date($scope.vm.purchase.docdate) || new Date());
        expect($scope.vm.purchase.items.length).toEqual(1);
        expect($scope.vm.purchase.items[0].amount).toEqual(2000000);
        expect($scope.vm.purchase.amount).toEqual(2000000);
        expect($scope.vm.purchase.remark.length).toEqual(2);
        expect($scope.vm.purchase.remark[0]).toEqual('ต้องมีข้อมูลการประกาศ Website BAM');
        expect($scope.vm.purchase.remark[1]).toEqual('ต้องมีข้อมูลคุมสัญญาจากสำนักงาน ป.ป.ช.');
        

      }));
    });

    describe('vm.removeProduct()', function () {

      beforeEach(function () {
        $scope.vm.purchase.items = arrayProduct;
        $scope.vm.index = 0;
      });

      it('should vm.removeProduct()', function () {
        $scope.vm.removeProduct($scope.vm.index);
        $scope.vm.purchase.items.splice($scope.vm.index, 1);
        expect($scope.vm.purchase.items.length).toEqual(0);
      });
    });
    
    describe('vm.save() as create', function () {
      var samplePurchasePostData;

      beforeEach(function () {
        // Create a sample Purchase object
        samplePurchasePostData = new PurchasesService({
          name: 'Purchase Name'
        });

        $scope.vm.purchase = samplePurchasePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (PurchasesService) {
        // Set POST response
        $httpBackend.expectPOST('api/purchases', samplePurchasePostData).respond(mockPurchase);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Purchase was created
        expect($state.go).toHaveBeenCalledWith('purchases.list');
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/purchases', samplePurchasePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Purchase in $scope
        $scope.vm.purchase = mockPurchase;
      });

      it('should update a valid Purchase', inject(function (PurchasesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/purchases\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('purchases.list');
      }));

      it('should set $scope.vm.error if error', inject(function (PurchasesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/purchases\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Purchases
        $scope.vm.purchase = mockPurchase;
      });

      it('should delete the Purchase and redirect to Purchases', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/purchases\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('purchases.list');
      });

      it('should should not delete the Purchase and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
} ());
