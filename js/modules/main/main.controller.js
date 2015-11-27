(function () {
    angular
        .module('poemApp')
        .controller('MainController', mainController);

    mainController.$inject = ['CONFIG', '$scope', '$rootScope', '$templateCache', 'myOffCanvas', 'mainService'];

    function mainController(CONFIG, $scope, $rootScope, $templateCache, myOffCanvas, mainService) {

        var main = this;
        console.log('hi');
        main.pieces = mainService.shuffleArray(mainService.createPieces());
        main.selectedPieces = false;
        main.toggle = myOffCanvas.toggle;

        main.addToPlaylist = function (track) {
            mainService.addToPlaylist(track);
            main.selectedPieces = true;
            main.pieces = mainService.shuffleArray(main.pieces);
            $rootScope.$broadcast('pieceAdded');
        }
    }
}());
