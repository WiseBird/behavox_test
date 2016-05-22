/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IShortViewDirectiveScope extends ng.IScope {
        shortViewController: ShortViewDirectiveController;
    }

    class ShortViewDirectiveController {
        email: Email;
        showIcons: boolean;

        constructor(public $scope: IShortViewDirectiveScope) {

        }

        emailRecipients(): string[] {
            var result = [];

            result = result.concat(this.email.to);
            result = result.concat(this.email.cc);
            result = result.concat(this.email.bcc);

            // removing duplicates
            return result.filter(function(item, pos) {
                return result.indexOf(item) == pos;
            });
        }
    }

    var shortViewDirectiveControllerRegistration = [
        '$scope',
        ShortViewDirectiveController];

    function shortViewDirective(): ng.IDirective {
        return {
            templateUrl: 'scripts/emails/view/shortView.html',
            replace: true,
            restrict: 'EA',
            controller: shortViewDirectiveControllerRegistration,
            controllerAs: 'shortViewController',
            scope: {},
            bindToController: {
                email: "=",
                showIcons: "="
            }
        };
    }

    export var shortViewDirectiveRegistration = [shortViewDirective];
}