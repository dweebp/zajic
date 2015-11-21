(function () {
    angular
        .module('poemApp')
        .controller('MainController', mainController);

    mainController.$inject = ['CONFIG', '$rootScope', '$templateCache', 'myOffCanvas', 'mainService'];

    function mainController(CONFIG, $rootScope, $templateCache, myOffCanvas, mainService) {

        var main = this;
        console.log('hi');
        main.pieces = mainService.shuffleArray(mainService.createPieces());

        main.toggle = myOffCanvas.toggle;

        main.addToPlaylist = function (track) {
            mainService.addToPlaylist(track);
            main.pieces = mainService.shuffleArray(main.pieces);
            $rootScope.$broadcast('pieceAdded');
        }
    }
}());
