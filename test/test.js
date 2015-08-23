  describe('initial test', function() {
  var mainCtrl, scope;
  var urlPath = "http://localhost:8080/#/ddd";
  beforeEach(module('birthday'))
  beforeEach(inject(function($controller, $rootScope){
  //crucial: 
  scope= $rootScope.$new();
  mainCtrl = $controller('MainController', {$scope: scope});
  }));
  describe('MainController', function(){
    it("should have name of Jess initial", function(){
      scope.guestName = "Jess";
      expect(scope.setMessage(scope.guestName, 0)).toEqual("Hi,Jess, You are invited to ");
    })
  });
});
