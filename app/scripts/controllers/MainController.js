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

  function setRsvp(num){
    console.log(num);
  };

  var actions = {
    rsvp: {
      label: "RSVP",
      prompt:"Great, see you there",
      action: setRsvp(1)
    },
    decline:{
      label: "Decline",
      prompt:"Sorry to hear that, you'll be missed",
      action: setRsvp(2)
    },
    cancel:{
      label: "Cancel RSVP",
      prompt:"You have canceled you RSVP, you'll be missed",
      action: setRsvp(3)
    },
    pending: {
      label: "Decide later",
      prompt:"Sure, you can tell us later",
      action: setRsvp(4)
    }
  };
  var welcome =[
    {
      id: 0,
      status: "init",
      msg: "You are invited to ",
      btn: [actions.rsvp.label, actions.decline.label]
    },
    {
      id: 1,
      status: "accespted",
      msg: "You have RSVPed to ",
      btn: [actions.cancel.label, actions.pending.label]
    },
    {
      id: 2,
      status: "declined",
      msg: "You won't be coming to ",
      btn: [actions.rsvp.label, actions.pending.label]
    },
    {
      id: 3,
      status: "canceled",
      msg: "You have canceled your RSVP to ",
      btn: [actions.rsvp.label, actions.pending.label]
    },
    {
      id: 4,
      status: "pending",
      msg: "You are invited to ",
      btn: [actions.rsvp.label, actions.cancel.label]
    },
    {
      id: 5,
      status: "noaccess",
      msg: "Hi stranger, looks like you are not on the guest list to ",
      btn: []
    }
  ];
  $scope.setMessage = function(guestName, rsvp){
    if(guestName){
      return ("Hi " + guestName +", "+ welcome[rsvp].msg);
    } else{
      return(welcome[5].msg);
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

  $scope.getButtons = function(index){
    return welcome[index].btn;
  }

  function init(response){
    $scope.guests = response;
    $scope.guest = $scope.getGuest($scope.path, $scope.guests);
    $scope.guestName = $scope.guest.name;
    $scope.intro = $scope.setMessage($scope.guestName, $scope.guest.rsvp);
    $scope.buttons = $scope.getButtons($scope.guest.rsvp);
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
