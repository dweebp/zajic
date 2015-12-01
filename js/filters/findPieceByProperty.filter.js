(function () {
    'use strict';
    angular.module('poemApp')
        .filter('findPieceByProperty', findPieceByProperty);

    findPieceByProperty.$inject = [];

    function findPieceByProperty() {
        return function (property, value, pieces) {
            var elIndex = null;
            angular.forEach(pieces, function (piece) {
                if (piece[property] == value) {
                    elIndex = pieces.indexOf(piece);
                }

            });
            return elIndex;

        }

    }
}());
