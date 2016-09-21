// Home controller
/*@ngInject*/
function HomeCtrl($scope) {
  var vm = this;

  vm.class = 'page-home';
}

HomeCtrl.$inject = ["$scope"];

module.exports = HomeCtrl;
