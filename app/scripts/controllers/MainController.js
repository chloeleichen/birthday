'use strict';
module.exports = function($scope, $location){
  // $scope.name
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
      msg: "You have canceled your RSVP",
      btn: [rsvp, pending]
    },
    {
      id: 4,
      status: "pending",
      msg: "You are invited to ",
      btn: [rsvp, cancel]
    }
  ];

  var rsvpStatus = 0;
  $scope.setMessage = function(guestName, rsvp){
    if(guestName){
      return ("Hi," + $scope.guestName +", "+ welcome[rsvp].msg);
    } else{
      return( "Hi stranger, looks like you are not on the guestlist to ");
    }
  };

  $scope.path = $location.path().replace(/^\/|\/$/g, '');
  $scope.guestName = null;
  $scope.intro = $scope.setMessage($scope.guestName, rsvpStatus);




}
