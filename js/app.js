(function () {
    angular.module('poemApp', ['ui.router', 'cn.offCanvas', 'mediaPlayer'])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $urlRouterProvider.otherwise("/home");

        }])


})();
