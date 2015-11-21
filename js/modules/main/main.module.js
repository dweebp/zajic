(function () {
    angular.module('poemApp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',

                    templateUrl: 'js/modules/main/main.tpl.html',
                    controller: 'MainController',
                    controllerAs: 'ctrl'


                })
        })

}());
