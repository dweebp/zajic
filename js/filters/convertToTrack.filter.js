(function () {
    'use strict';
    angular.module('poemApp')
        .filter('convertToTrack', convertToTrack);

    convertToTrack.$inject = ['CONFIG'];

    function convertToTrack(CONFIG) {
        return function (track) {
            var newTrack = {

                src: CONFIG.tracks_folder + track.filename,
                type: 'audio/' + CONFIG.formats[0]
            }
            return newTrack;
        }

    }
}());
