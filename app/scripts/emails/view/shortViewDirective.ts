/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IShortViewDirectiveScope extends ng.IScope {
        shortViewController: ShortViewDirectiveController;
    }

    class ShortViewDirectiveController {
        email: Email;
        showIcons: boolean;

        recipients: string[];
        matchedUsers: string[] = [];

        fromMatched: boolean;
        matchedRecipients: string[] = [];
        unmatchedRecipients: string[] = [];

        constructor(public $scope: IShortViewDirectiveScope,
                    public filter: EmailsFilter) {

            this.recipients = this.email.getRecipients();

            this.$scope.$watch(() => this.filter, () => {
                this.matchedUsers = this.filter.getMatchedUsers(this.email);

                this.fromMatched = this.matchedUsers.indexOf(this.email.from) !== -1;
                this.matchedRecipients = this.recipients.filter(x => this.matchedUsers.indexOf(x) !== -1);
                this.unmatchedRecipients = this.recipients.filter(x => this.matchedUsers.indexOf(x) === -1);
            }, true);
        }
    }

    var shortViewDirectiveControllerRegistration = [
        '$scope',
        'test.emails.filter',
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