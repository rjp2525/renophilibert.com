// About controller
/*@ngInject*/
function AboutCtrl($scope) {
  var vm = this;

  vm.class = 'page-about';
}

AboutCtrl.$inject = ["$scope"];

module.exports = AboutCtrl;
