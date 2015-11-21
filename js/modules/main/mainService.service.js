(function () {
    'use strict';
    angular.module('poemApp')
        .factory('mainService', mainService);

    mainService.$inject = ['CONFIG']

    function mainService(CONFIG) {
        var factory = {
            createPieces: createPieces
        };

        return factory;


        function createPieces() {
            var pieces = [];

            for (var i = 0; i < CONFIG.tracks.length; i++) {
                pieces.push(CONFIG.tracks[i])
            }
            console.log('pieces:', pieces);

            return pieces;
        }
    }
}());
