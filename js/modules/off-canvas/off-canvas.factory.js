(function () {
    angular.module('poemApp')
        .factory('myOffCanvas', myOffCanvas);

    myOffCanvas.$inject = ['cnOffCanvas'];

    function myOffCanvas(cnOffCanvas) {
        return cnOffCanvas({
            controller: 'MyOffCanvasCtrl',
            controllerAs: 'offCanvas',
            templateUrl: 'js/modules/off-canvas/off-canvas.tpl.html'
        })

    }
}());
