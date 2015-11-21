(function () {
    angular
        .module('main')
        .controller('MainController', mainController);

    function mainController() {

        var main = this;
        main.hallo = 'hallo';

    }
}());
