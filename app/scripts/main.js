(function () {
  'use strict';
  var angular = require('angular');
  //create module
  var beer = angular.module('beer', ['ngRoute']);
  require('angular-router-browserify')(angular);

  //create controller 
  beer.controller('NavController', require('./controllers/NavController'));
  beer.controller('MainController', require('./controllers/MainController'));



  //setup routing 
  beer.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'app/views/main.html',
      controller: 'MainController'
    }).
    when('/about', {
      templateUrl: 'app/views/about.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }]);
})();
