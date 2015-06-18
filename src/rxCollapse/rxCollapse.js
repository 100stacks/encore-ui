angular.module('encore.ui.rxCollapse', [])
/**
 * @ngdoc directive
 * @name encore.ui.rxCollapse:rxCollapse
 * @restrict E
 * @scope
 * @description
 * Hide and show an element with a transition.
 *
 * @param {string} [title] The title to display next to the toggle button. Default is "See More/See Less" toggle.
 * @param {string} [expanded] Initially expanded or collapsed. Default is expanded.
 *
 * @example
 * <pre>
 *     <rx-collapse title="Filter results" expanded="true">Text Here</rx-collapse>
 *     <rx-collapse expanded="true">Text Here</rx-collapse>
 * </pre>
 */
.directive('rxCollapse', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxCollapse.html',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function (scope, element, attrs) {
            scope.isExpanded = (attrs.expanded === 'false') ? false : true;

            scope.toggleTitleAndCollapse = function () {
                scope.isExpanded = !scope.isExpanded;
                scope.toggleTitle = (scope.isExpanded === true) ? 'See Less' : 'See More';
                setChev();
            };

            var setChev = function () {
                if (scope.isExpanded === false) {
                    scope.arrowChange = 'fa-angle-double-down';
                } else {
                    scope.arrowChange = 'fa-angle-double-up';
                }
            };

            if (!scope.title) {
                scope.toggleTitle = (scope.isExpanded === true) ? 'See Less' : 'See More';
                scope.cContainer = 'hideBorder';
                scope.hasTitle = false;
            } else {
                scope.hasTitle = true;
                scope.ispad = 'collapse-body';
            }
            setChev();
        }
    };
});
