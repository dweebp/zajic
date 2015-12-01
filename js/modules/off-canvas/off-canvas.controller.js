(function () {
    'use strict';
    angular.module('poemApp')
        .controller('MyOffCanvasCtrl', offCanvasCtrl);
    offCanvasCtrl.$inject = ['myOffCanvas', 'CONFIG', '$rootScope', '$scope', '$filter', 'mainService']

    function offCanvasCtrl(myOffCanvas, CONFIG, $rootScope, $scope, $filter, mainService) {
        var offCanvas = this;

        offCanvas.playlist = [];
        offCanvas.wtf = [];
        offCanvas.socialText = CONFIG.socialText;
        offCanvas.socialLink = CONFIG.socialLink;
        offCanvas.poem = '';

        offCanvas.getPlaylist = function () {
            $scope.mediaPlayer.stop();
            offCanvas.playlist = [];
            offCanvas.poem = '';
            angular.forEach(angular.copy(mainService.getPlaylist()), function (track) {
                offCanvas.poem += ' ' + track.text;
                offCanvas.playlist.push($filter('convertToTrack')(angular.copy(track)));

            });

        }
        offCanvas.resetPlaylist = function () {
            $rootScope.$broadcast('resetPlaylist');
            mainService.resetPlaylist();
            offCanvas.getPlaylist();
            offCanvas.toggle();
        }

        $scope.$on('pieceAdded', function (evt) {
            offCanvas.getPlaylist();
        });
        offCanvas.toggle = myOffCanvas.toggle;
    }
}());
