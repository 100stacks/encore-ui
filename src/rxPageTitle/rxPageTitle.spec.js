/* jshint node: true */

describe('rxPageTitle', function () {
    var pageTitle, scope, rootScope;

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.rxPageTitle');

        // Inject in angular constructs
        inject(function ($rootScope) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
        });

        inject(function (rxPageTitle) {
            pageTitle = rxPageTitle;
        });
    });

    it('should set a title without a suffix', function () {
        var title = 'new title';

        pageTitle.setTitle(title);

        expect(pageTitle.getTitle()).to.equal(title);
    });

    it('should allow specification of a suffix', function () {
        var suffix = ' :: new suffix';

        pageTitle.setSuffix(suffix);

        expect(pageTitle.getSuffix()).to.equal(suffix);
    });

    it('should set the title, including the suffix', function () {
        var title = 'New Title';
        var suffix = ' :: new suffix';

        pageTitle.setSuffix(suffix);
        pageTitle.setTitle(title);

        expect(pageTitle.getTitle()).to.equal(title + suffix);
    });

    it('should strip HTML tags from the title', function () {
        var title = 'New Title <span>Alpha</span>';
        var expectedTitle = 'New Title Alpha';

        pageTitle.setTitle(title);
        expect(pageTitle.getTitle()).to.equal(expectedTitle);
    });
    
    it('should strip HTML tags from the suffix', function () {
        var title = 'New Title';
        var suffix = ' :: <span>Beta</span>';
        var expectedTitle = 'New Title :: Beta';

        pageTitle.setSuffix(suffix);
        pageTitle.setTitle(title);
        expect(pageTitle.getTitle()).to.equal(expectedTitle);
    });

    it('should protect against null titles', function () {
        pageTitle.setTitle(null);
        expect(pageTitle.getTitle()).to.equal('');
    });

    it('should strip attributes from HTML tags', function () {
        var title = 'New Title <span class="foo">Alpha</span>';
        var expectedTitle = 'New Title Alpha';

        pageTitle.setTitle(title);
        expect(pageTitle.getTitle()).to.equal(expectedTitle);
        
    });

    it('should handle escaped characters', function () {
        var title = 'New Title <span class="foo">&lt;Alpha&gt;</span>';
        var expectedTitle = 'New Title <Alpha>';

        pageTitle.setTitle(title);
        expect(pageTitle.getTitle()).to.equal(expectedTitle);
        
    });
});
