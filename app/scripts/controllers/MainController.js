module.exports = function($scope, $location, $http, $firebaseArray){
  'use strict';
   var empObj = {
              "name": null,
              "rsvp": 5,
              "number": 0
              },
       data, 
       guestList,
       sub = "to Jeremy's 40th Party!";

  $scope.path = $location.path().replace(/^\/|\/$/g, '');
  $scope.guest = empObj;
  $scope.guests =[];
  $scope.prompt = "";
  $scope.ready = false;
  $scope.intro = "hi";

  var welcome =[
    {
      //init
      status: "0",
      msg: "You are invited ",
      prompt: ""
    },
    {
      //rsvped
      status: "1",
      msg: "You have RSVPed ",
      prompt: "Great, see you there"
    },
    {
      // declined 
      status: "2",
      msg: "You won't be coming ",
      prompt: "Sorry to hear that, you'll be missed"
    },
    {
      //pending 
      status: "3",
      msg: "You have a pending invitation ",
      prompt: "Sure, you can tell us later"
    },
    {
      //noAccess
      status: "4",
      msg: "Hi stranger, looks like you are not on the guest list",
      prompt: ""
    }
  ];
  $scope.setMessage = function(guestName, rsvp){
    if(guestName){
      return ("Hi " + guestName +", "+ welcome[rsvp].msg + sub);
    } else{
      return(welcome[4].msg);
    }
  };

  $scope.getGuest = function(value, arr){
    var currentGuest = arr.filter(function(item){
      return (item.name.toLowerCase() === value);
    });
    if (currentGuest.length === 1){
      return currentGuest[0];
    }else{
      // wrong hash, access denied
      return empObj;
      }
  };

  $scope.setClass = function(){
    return "rsvp"+ $scope.guest.rsvp;
  }

  $scope.takeAction = function(i){
    if($scope.guest.rsvp !== i){
      $scope.prompt = welcome[i].prompt;
      $scope.guest.rsvp = i;
      guestList.$save($scope.guest).then(function(ref) {
        $scope.intro = $scope.setMessage($scope.guestName, $scope.guest.rsvp);
      });
      $scope.setPromptClass("prompt--open");
    }
  }

  $scope.setPromptClass = function(className){
    $scope.promptClass = className;
  }

  function init(response){
    $scope.guests = response;
    $scope.guest = $scope.getGuest($scope.path, $scope.guests);
    if(($scope.guest.$id !== undefined) && ($scope.guest.$id !== null)){
      $scope.ready = true;
    }
    $scope.guestName = $scope.guest.name;
    $scope.intro = $scope.setMessage($scope.guestName, $scope.guest.rsvp);
  };

  data = new Firebase("https://jbirthday.firebaseio.com/");
  guestList = $firebaseArray(data);

  guestList.$loaded()
  .then(function(list) {
    init(list);
  })
  .catch(function(error) {
    console.log("Error:", error);
  });
}
