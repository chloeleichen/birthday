(function () {
  'use strict';
  var angular = require('angular');
  require('angularfire');
  require('firebase');
  //create module
  var birthday = angular.module('birthday', []);
  //create controller 
  birthday.controller('MainController', require('./controllers/MainController'));

})();

