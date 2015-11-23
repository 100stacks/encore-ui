var Page = require('astrolabe').Page;

describe('rxBulkSelect', function () {

    var page = Page.create({

        selectFirst: {
            value: function () {
                element.all(by.css('tbody tr:nth-child(1) input')).click();
            }
        },

        btnSelectDatacenters: {
            get: function () {
                return $('rx-modal-action#selectDatacenters a');
            }
        }

    });

    before(function () {
        demoPage.go('#/components/rxBulkSelect');
    });

    describe('exercises', encore.exercise.rxBulkSelect({
        batchActions: ['Shutdown Selected Datacenters']
    }));

    describe('rxBulkSelectValidate', function () {

        var bulkSelect, validateModal;

        beforeEach(function () {
            bulkSelect = encore.rxBulkSelect.main;
            validateModal = encore.rxModalAction.initialize();
        });

        it('disables the submit button when no items are selected', function () {
            page.btnSelectDatacenters.click();
            expect(validateModal.canSubmit()).to.eventually.be.false;
        });

        it('enables the submit button when an item is selected', function () {
            page.selectFirst();
            expect(validateModal.canSubmit()).to.eventually.be.true;
        });
    });

});
