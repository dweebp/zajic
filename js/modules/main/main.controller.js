(function () {
    angular
        .module('poemApp')
        .controller('MainController', mainController);

    mainController.$inject = ['CONFIG', 'myOffCanvas', 'mainService'];

    function mainController(CONFIG, myOffCanvas, mainService) {

        var main = this;
        console.log('hi');
        main.pieces = mainService.createPieces();
        main.toggle = myOffCanvas.toggle;
    }
}());
