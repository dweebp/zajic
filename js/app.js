(function () {
    angular.module('poemApp', ['ui.router', 'cn.offCanvas', 'mediaPlayer', 'config'])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $urlRouterProvider.otherwise("/home");

        }])


})();
