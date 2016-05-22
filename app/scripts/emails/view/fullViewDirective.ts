/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IFullViewDirectiveScope extends ng.IScope {
        fullViewController: FullViewDirectiveController;
    }

    class FullViewDirectiveController {
        email: Email;
        preview: boolean;

        constructor(public $scope: IFullViewDirectiveScope) {

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
                email: "=",
                preview: "="
            }
        };
    }

    export var fullViewDirectiveRegistration = [fullViewDirective];
}