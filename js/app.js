(function () {
    angular.module('poemApp', ['mainModule'])
        .config(['$rounteProvider', function ($routeProvider) {
                $routeProvider.
                 when('/phones', {
                    templateUrl: 'partials/phone-list.html',
                    controller: 'PhoneListCtrl'
                  }
                ).
                otherwise({
                    redirectTo: '/home'
                });
    }
            ])
})();