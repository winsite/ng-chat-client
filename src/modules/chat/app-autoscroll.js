module.exports = autoscrollDirective;

function autoscrollDirective() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.appAutoscroll, autoscroll);

            function autoscroll(value) {
                if (value) {
                    element[0].scrollIntoView();
                }
            }
        }
    }
}