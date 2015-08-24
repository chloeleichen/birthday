//Unit testing 
  describe('birthday', function() {
  var mainCtrl, scope;
  var urlPath = "http://localhost:8080/#/ddd";
  beforeEach(module('birthday'))
  beforeEach(inject(function($controller, $rootScope){
  //crucial: 
  scope= $rootScope.$new();
  mainCtrl = $controller('MainController', {$scope: scope});
  }));
  describe('MainController', function(){
    it("invitation", function(){
      expect(scope.setMessage("Jess", 0)).toEqual("Hi Jess, You are invited to ");
      expect(scope.setMessage("Sue", 1)).toEqual("Hi Sue, You have RSVPed to ");
      expect(scope.setMessage("Matt", 2)).toEqual("Hi Matt, You won't be coming to ");
      expect(scope.setMessage("John", 3)).toEqual("Hi John, You have a pending invitation to ");
      expect(scope.setMessage("", 4)).toEqual("Hi stranger, looks like you are not on the guest list to ");
    });
    it("Check guest list", function(){
      var arr = [{
        "name": "John",
        "rsvp": "0",
        "number": "1"
        },
        {
        "name": "Linden and Daisy",
        "rsvp": "2",
        "number": "2"
        }];
      scope.guest = arr[1];
      expect(scope.getGuest("john", arr).name).toBe("John");
      expect(scope.getGuest("linden and daisy", arr).name).toBe("Linden and Daisy");
      expect(scope.getGuest("", arr).name).toBe(null);
      expect(scope.setClass()).toBe("rsvp2");
    });
  });
});
