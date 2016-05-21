/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IFullViewDirectiveScope extends ng.IScope {
        fullViewController: FullViewDirectiveController;
    }

    class FullViewDirectiveController {
        email: Email;

        constructor(public $scope: IFullViewDirectiveScope) {
            var i = 1;
        }
    }

    var fullViewDirectiveControllerRegistration = [
        '$scope',
        FullViewDirectiveController];

    function fullViewDirective(): ng.IDirective {
        return {
            templateUrl: 'scripts/emails/view/fullView.html',
            replace: true,
            restrict: 'EA',
            controller: fullViewDirectiveControllerRegistration,
            controllerAs: 'fullViewController',
            scope: {},
            bindToController: {
                email: "="
            }
        };
    }

    export var fullViewDirectiveRegistration = [fullViewDirective];
}