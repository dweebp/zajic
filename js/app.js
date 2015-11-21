(function () {
    angular.module('poemApp', ['ui.router', 'ui.bootstrap', 'cn.offCanvas', 'mediaPlayer', 'config', 'angular-nicescroll'])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $urlRouterProvider.otherwise("/home");

        }])


})();
