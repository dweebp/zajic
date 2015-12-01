(function () {
    angular
        .module('poemApp')
        .controller('MainController', mainController);

    mainController.$inject = ['CONFIG', '$scope', '$rootScope', '$filter', '$templateCache', '$timeout', 'myOffCanvas', 'mainService'];

    function mainController(CONFIG, $scope, $rootScope, $filter, $templateCache, $timeout, myOffCanvas, mainService) {

        var main = this;
        main.showInfo = false;
        main.pieces = mainService.shuffleArray(mainService.createPieces());
        main.selectedPieces = false;
        main.clickInProgress = false;
        main.toggle = myOffCanvas.toggle;

        main.socialText = CONFIG.socialText;
        main.socialLink = CONFIG.socialLink;

        main.toggleShowInfo = function () {
            main.showInfo = !main.showInfo;
        }

        main.addToPlaylist = function (piece) {
            if (!main.clickInProgress) {
                main.clickInProgress = true;
                $timeout(function () {
                    mainService.addToPlaylist(piece);
                    $rootScope.$broadcast('pieceAdded');
                    main.selectedPieces = true;
                    var wasNextIndex = $filter('findPieceByProperty')('isNext', true, main.pieces);
                    var wasClickedIndex = $filter('findPieceByProperty')('isClicked', true, main.pieces);


                    if (wasNextIndex) {
                        main.pieces[wasNextIndex].isNext = false;
                    }

                    if (wasClickedIndex) {
                        main.pieces[wasClickedIndex].isClicked = false;
                    }



                    var isClickedIndex = main.pieces.indexOf(piece);
                    var isClickedId = main.pieces[isClickedIndex].id;
                    restQueueParams();
                    main.pieces[isClickedIndex].isClicked = true;

                    if (isClickedId <= main.pieces.length - 1) {
                        var lookedId = parseInt(isClickedId) + 1;
                        var nextId = $filter('findPieceByProperty')('id', parseInt(lookedId), main.pieces);
                        main.pieces[nextId].isNext = true;
                    }
                    main.pieces = mainService.shuffleArray(main.pieces);
                    main.clickInProgress = false;

                }, 250)
            }
        }

        main.toggleTooltip = function () {
            main.popoverOpen = !main.popoverOpen;
        }

        $scope.$on('resetPlaylist', function () {
            main.pieces = mainService.shuffleArray(mainService.createPieces());
            var nextId = $filter('findPieceByProperty')('id', 1, main.pieces);
            main.pieces[nextId].isNext = true;
            main.selectedPieces = false;
        })


        main.getInfoBoxHeight = function () {
            var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var menuHeight = angular.element(document.getElementsByTagName('nav')).clientHeight;
            var copyHeight = angular.element(document.getElementById('copy')).clientHeight;
            return viewportHeight - menuHeight - copyHeight + 'px';


        }

        function restQueueParams() {
            angular.forEach(main.pieces, function (piece) {
                piece.isClicked = false;
                piece.isNext = false;
            })
        }
    }
}());
