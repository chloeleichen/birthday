module.exports = function($scope, $location, $http){
  'use strict';
  var rsvpStatus = 0,
      empObj = {
              "name": null,
              "rsvp": null,
              "number": null
              };

  $scope.guests =[];
  $scope.path = $location.path().replace(/^\/|\/$/g, '');
  $scope.guest;

  var rsvp = "RSVP", 
      decline ="decline", 
      cancel = "cancel", 
      pending ="Decide later";
  var welcome =[
    {
      id: 0,
      status: "init",
      msg: "You are invited to ",
      btn: [rsvp, cancel]
    },
    {
      id: 1,
      status: "accespted",
      msg: "You have RSVPed to ",
      btn: [cancel, pending]
    },
    {
      id: 2,
      status: "declined",
      msg: "You won't be coming to ",
      btn: [rsvp, pending]
    },
    {
      id: 3,
      status: "canceled",
      msg: "You have canceled your RSVP to ",
      btn: [rsvp, pending]
    },
    {
      id: 4,
      status: "pending",
      msg: "You are invited to ",
      btn: [rsvp, cancel]
    }
  ];
  $scope.setMessage = function(guestName, rsvp){
    if(guestName){
      return ("Hi " + guestName +", "+ welcome[rsvp].msg);
    } else{
      return( "Hi stranger, looks like you are not on the guest list to ");
    }
  };

  $scope.getGuest = function(value, array){
    var currentGuest = array.filter(function(item){
      return (item.name.toLowerCase() === value);
    });
    if (currentGuest.length === 1){
      return currentGuest[0];
    }else{
      return empObj;
      }
  };

  function init(response){
    $scope.guests = response;
    $scope.guest = $scope.getGuest($scope.path, $scope.guests);
    $scope.guestName = $scope.getGuest($scope.path, $scope.guests).name;
    $scope.intro = $scope.setMessage($scope.guestName, rsvpStatus);
  };


  $http.get('./../data.json')
  .success(function(response){
    init(response);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.save = function(guest){
    $http.post('./../data.json', guest)
    .success(function(){
      console.log("saved");
    })
    .error(function(err){
      console.log(err);
    });
  }

}
