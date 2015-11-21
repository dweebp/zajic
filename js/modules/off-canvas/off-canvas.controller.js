(function () {
    'use strict';
    angular.module('poemApp')
        .controller('MyOffCanvasCtrl', offCanvasCtrl);


    function offCanvasCtrl(myOffCanvas) {
        var offCanvas = this;

        offCanvas.toggle = myOffCanvas.toggle;
    }
}());
