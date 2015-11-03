/* jshint node: true */

describe('rxBulkSelect', function () {
    var scope, compile, rootScope, timeout;

    var template =
        '<table rx-bulk-select bulk-source="servers" selected-key="rowIsSelected" num-columns="2">' +
            '<thead>' +
                '<tr>' +
                    '<th><rx-batch-actions></rx-batch-actions></th>' +
                '</tr>' +
                '<tr>' +
                    '<th rx-bulk-select-header-check></th>' +
                    '<th>Name</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody ng-repeat="server in servers">' +
                '<tr>' +
                    '<td rx-bulk-select-row row="server"></td>' +
                    '<td>{{ server.name }}</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<table>' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>Title</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr>' +
                                    '<td>Content</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>';

    var servers = [
        { name: 'server1', rowIsSelected: false },
        { name: 'server2', rowIsSelected: false },
        { name: 'server3', rowIsSelected: false }
    ];

    var rxBulkSelectUtils = {
        setAllVisibleRows: function (val, tableElement, key) {
            _.each(servers, function (server) {
                server[key] = val;
            });
        }
    };

    beforeEach(function () {
        module('encore.ui.rxMisc');
        module('encore.ui.rxBulkSelect', function ($provide) {
            $provide.value('rxBulkSelectUtils', rxBulkSelectUtils);
        });
        module('templates/rxBulkSelectMessage.html');
        module('templates/rxBatchActions.html');

        inject(function ($compile, $rootScope, $timeout) {
            compile = $compile;
            rootScope = $rootScope;
            scope = rootScope.$new();
            timeout = $timeout;
        });

        scope.servers = servers;
        scope.$digest();
    });

    describe('controller:rxBulkSelectController', function () {
        var ctrl, ctrlScope, numSelected;

        beforeEach(function () {
            ctrlScope = rootScope.$new();
            ctrlScope.tableElement = {};
            ctrlScope.selectedKey = 'rowIsSelected';
            ctrlScope.bulkSource = scope.servers;

            inject(function ($controller) {
                ctrl = $controller('rxBulkSelectController', {
                    $scope: ctrlScope
                });
            });

            var update = function (newVal) {
                numSelected = newVal;
            };

            ctrl.registerForNumSelected(update);
        });

        it('should allow for numSelected registrations',  function () {
            // In the actual directives, the call to `ctrl.increment()`
            // happens automatically when `rowIsSelected` goes true. It's
            // only in the tests that I have to set them separately like this
            scope.servers[0].rowIsSelected = true;
            ctrl.increment();
            timeout.flush();
            expect(numSelected).to.equal(1);

            scope.servers[1].rowIsSelected = true;
            ctrl.increment();
            timeout.flush();
            expect(numSelected).to.equal(2);

            scope.servers[1].rowIsSelected = false;
            ctrl.decrement();
            timeout.flush();
            expect(numSelected).to.equal(1);
        });

        it('should return the row key', function () {
            expect(ctrl.key()).to.equal('rowIsSelected');
        });

        it('should select all visible rows', function () {
            ctrl.selectAllVisibleRows();
            timeout.flush();
            expect(numSelected).to.equal(3);
        });

        it('should deselect all visible rows', function () {
            ctrl.deselectAllVisibleRows();
            timeout.flush();
            expect(numSelected).to.equal(0);
        });

        it('should select all rows', function () {
            ctrl.selectEverything();
            timeout.flush();
            expect(numSelected).to.equal(3);
        });

        it('should deselect all rows', function () {
            ctrl.deselectEverything();
            timeout.flush();
            expect(numSelected).to.equal(0);
        });
    });//controller:rxBulkSelectController
});//rxBulkSelect
