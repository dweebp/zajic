(function () {
    'use strict';
    angular.module('poemApp')
        .factory('mainService', mainService);

    mainService.$inject = ['CONFIG']

    function mainService(CONFIG) {
        var factory = {
            createPieces: createPieces,
            shuffleArray: shuffleArray
        };

        return factory;


        function createPieces() {
            var pieces = [];

            for (var i = 0; i < CONFIG.tracks.length; i++) {
                var piece = {
                    id: CONFIG.tracks[i].id,
                    number: i + 1,
                    text: CONFIG.tracks[i].text,
                    filename: CONFIG.tracks[i].file_name + CONFIG.formats[0],
                }
                pieces.push(piece);
            }
            console.log('pieces:', pieces);

            return pieces;
        }

        function shuffleArray(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    }
}());
