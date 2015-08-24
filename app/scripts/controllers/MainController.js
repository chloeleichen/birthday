module.exports = function($scope, $location, $http){
  'use strict';
   var empObj = {
              "name": null,
              "rsvp": 5,
              "number": 0
              };

  $scope.guests =[];
  $scope.path = $location.path().replace(/^\/|\/$/g, '');
  $scope.guest;
  $scope.prompt;

  function setRsvp(num){
    console.log(num);
  };

  var welcome =[
    {
      //init
      status: "0",
      msg: "You are invited to ",
      prompt: ""
    },
    {
      //rsvped
      status: "1",
      msg: "You have RSVPed to ",
      prompt: "Great, see you there"
    },
    {
      // declined 
      status: "2",
      msg: "You won't be coming to ",
      prompt: "Sorry to hear that, you'll be missed"
    },
    {
      //pending 
      status: "3",
      msg: "You have a pending invitation to ",
      prompt: "Sure, you can tell us later"
    },
    {
      //noAccess
      status: "4",
      msg: "Hi stranger, looks like you are not on the guest list to ",
      prompt: ""
    }
  ];
  $scope.setMessage = function(guestName, rsvp){
    if(guestName){
      return ("Hi " + guestName +", "+ welcome[rsvp].msg);
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
      return empObj;
      }
  };

  $scope.setClass = function(){
    return 'rsvp'+ $scope.guest.rsvp;
  }

  $scope.takeAction = function(i){
    $scope.prompt = welcome[i].prompt;
    $scope.guest.rsvp = i;
    console.log($scope.guest);
    $scope.save();
  }

  function init(response){
    $scope.guests = response;
    $scope.guest = $scope.getGuest($scope.path, $scope.guests);
    $scope.guestName = $scope.guest.name;
    $scope.intro = $scope.setMessage($scope.guestName, $scope.guest.rsvp);
  };


  $http.get('./../data.json')
  .then(function(response){
    init(response.data);
  },
  function(err){
    console.log(err);
  });

  $scope.save = function(guest){
    var updatedRsvp = angular.toJson($scope.guest.rsvp);
    $http.post('./../data.json', updatedRsvp)
    .then(function(){
    },
    function(err){
      console.log(err);
    });
  }
}
