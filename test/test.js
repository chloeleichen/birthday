  describe('initial test', function() {
  var mainCtrl, scope;
  beforeEach(module('beer'))
  beforeEach(inject(function($controller, $rootScope){
  //crucial: 
  scope= $rootScope.$new();
  mainCtrl = $controller('MainController', {$scope: scope});
  }));
  
  describe('MainController', function(){
    it("should have message of hello", function(){
      expect(mainCtrl.message).toBe("hello");
    })
  });
});
