(function () {
    angular
        .module('poemApp')
        .controller('MainController', mainController);

    function mainController() {

        var main = this;
        console.log('hi');
        main.hallo = 'hallo';

    }
}());
