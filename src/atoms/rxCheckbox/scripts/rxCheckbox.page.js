var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @description Functions for interacting with a single checkbox element.
 * @namespace
 */
var rxCheckbox = {
    eleWrapper: {
        get: function () {
            return this.rootElement.element(by.xpath('..'));
        }
    },

    eleFakeCheckbox: {
        get: function () {
            return this.eleWrapper.$('.fake-checkbox');
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the element in question is a checkbox.
     * @returns {Boolean}
     */
    isCheckbox: {
        value: function () {
            return this.rootElement.getAttribute('type').then(function (type) {
                return type === 'checkbox';
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether the checkbox is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            var page = this;
            return this.eleFakeCheckbox.isPresent().then(function (isFakeCheckbox) {
                return isFakeCheckbox ? page.eleFakeCheckbox.isDisplayed() : page.rootElement.isDisplayed();
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the checkbox is disabled.
     * @returns {Boolean}
     */
    isDisabled: {
        value: function () {
            var page = this;
            return this.eleFakeCheckbox.isPresent().then(function (isFakeCheckbox) {
                if (isFakeCheckbox) {
                    return page.eleWrapper.getAttribute('class').then(function (classes) {
                        return _.contains(classes.split(' '), 'rx-disabled');
                    });
                }
                return page.rootElement.getAttribute('disabled').then(function (disabled) {
                    return (disabled ? true : false);
                });
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the checkbox is present on the page.
     * @returns {Boolean}
     */
    isPresent: {
        value: function () {
            var page = this;
            return this.eleFakeCheckbox.isPresent().then(function (isFakeCheckbox) {
                return isFakeCheckbox || page.rootElement.isPresent();
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether the checkbox is valid.
     * @returns {Boolean}
     */
    isValid: {
        value: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return _.contains(classes.split(' '), 'ng-valid');
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the checkbox is selected.
     * @returns {Boolean}
     */
    isSelected: {
        value: function () {
            return this.rootElement.isSelected();
        }
    },

    /**
     * @instance
     * @function
     * @description Make sure checkbox is selected/checked.
     */
    select: {
        value: function () {
            var checkbox = this.rootElement;
            return this.isSelected().then(function (selected) {
                if (!selected) {
                    checkbox.click();
                }
            });
        }
    },

    /**
     * @instance
     * @deprecated
     * @function
     * @description DEPRECATED: Use {@link rxCheckbox#deselect} instead.
     * This function will be removed in a future release of the EncoreUI framework.
     * @returns {undefined}
     */
    unselect: {
        value: function () {
            return this.deselect();
        }
    },

    /**
     * @instance
     * @function
     * @description Make sure checkbox is deselected.
     * @returns {undefined}
     */
    deselect: {
        value: function () {
            var checkbox = this.rootElement;
            return this.isSelected().then(function (selected) {
                if (selected) {
                    checkbox.click();
                }
            });
        }
    }
};

exports.rxCheckbox = {
    /**
     * @function
     * @memberof rxCheckbox
     * @description Creates a page object from an <tt>[rx-checkbox]</tt> DOM element.
     * @param {ElementFinder} rxCheckboxElement -
     * ElementFinder to be transformed into an {@link rxCheckbox} page object.
     * @returns {rxCheckbox}
     */
    initialize: function (rxCheckboxElement) {
        rxCheckbox.rootElement = {
            get: function () { return rxCheckboxElement; }
        };
        return Page.create(rxCheckbox);
    },

    /**
     * @function
     * @memberof rxCheckbox
     * @description Generates a getter and a setter for an rxCheckbox element on your page.
     * @param {ElementFinder} elem - The ElementFinder for the rxCheckbox.
     * @returns {Object} A getter and a setter to be applied to a rxCheckbox page object.
     * @example
     * var myPage = Page.create({
     *     myCheckbox: encore.rxCheckbox.generateAccessor(element(by.model('settings')))
     * });
     */
    generateAccessor: function (elem) {
        return {
            get: function () {
                return exports.rxCheckbox.initialize(elem).isSelected();
            },
            set: function (enable) {
                var checkbox = exports.rxCheckbox.initialize(elem);
                enable ? checkbox.select() : checkbox.deselect();
            }
        };
    }
};
