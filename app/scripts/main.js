(function () {
  'use strict';
  var angular = require('angular');
  //create module
  var beer = angular.module('beer', []);
  //create controller 
  beer.controller('MainController', require('./controllers/MainController'));

})();

