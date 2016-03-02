/**
 * @ngdoc overview
 * @name molecules
 * @requires quarks
 * @requires atoms
 * @description
 * # Molecules
 * Molecules are complex elements made up of various Atoms.
 *
 * ## Directives
 * * {@link molecules.directive:rxDatePicker rxDatePicker}
 * * {@link molecules.directive:rxMultiSelect rxMultiSelect}
 * * {@link molecules.directive:rxSelectOption rxSelectOption}
 * * {@link molecules.directive:rxTimePicker rxTimePicker}
 */
angular.module('encore.ui.molecules', [
    'encore.ui.quarks',
    'encore.ui.atoms'
]);
