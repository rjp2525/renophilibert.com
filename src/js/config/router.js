// Routing Configuration
/*@ngInject*/
function Router($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
  $urlRouterProvider.otherwise('notfound');
  $urlMatcherFactoryProvider.strictMode(false);
  $locationProvider.html5Mode(true);

  // Define states
  $stateProvider
    .state('root', {
      abstract: true,
      views: {
        'app': {
          templateUrl: '/templates/layout/views.html'
        }
      }
    })
    .state('home', {
      url: '/',
      parent: 'root',
      views: {
        'main': {
          controller: 'HomeCtrl',
          controllerAs: '$vm',
          templateUrl: '/templates/pages/home.html'
        }
      }
    })
    .state('about', {
      url: '/about',
      parent: 'root',
      views: {
        'main': {
          controller: 'AboutCtrl',
          controllerAs: '$vm',
          templateUrl: '/templates/pages/about.html'
        }
      }
    })
    .state('notfound', {
      parent: 'root',
      views: {
        'main': {
          template: '<h1>404 Not Found</h1>'
        }
      }
    });
}

Router.$inject = ["$stateProvider", "$urlRouterProvider", "$urlMatcherFactoryProvider", "$locationProvider"];

module.exports = Router;
