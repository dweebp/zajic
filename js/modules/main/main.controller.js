(function () {
    angular
        .module('poemApp')
        .controller('MainController', mainController);

    mainController.$inject = ['myOffCanvas'];

    function mainController(myOffCanvas) {

        var main = this;
        console.log('hi');
        main.hallo = 'hallo';
        main.toggle = myOffCanvas.toggle;
    }
}());
