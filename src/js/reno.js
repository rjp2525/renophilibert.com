// Dependencies
require('angular');
require('angular-animate');
require('angular-ui-router');

// Inject dependencies
module.exports = angular.module('reno', [
  'ngAnimate',
  'ui.router'
])

// Configuration
.config(require('./config/router'))

// Controllers
.controller('HomeCtrl', require('./controllers/home'))
.controller('AboutCtrl', require('./controllers/about'));
