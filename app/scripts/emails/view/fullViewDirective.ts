/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IFullViewDirectiveScope extends ng.IScope {
        fullViewController: FullViewDirectiveController;
    }

    class FullViewDirectiveController {
        email: Email;
        preview: boolean;

        matchedUsers: string[] = [];
        subjectMatching: string[] = [];
        bodyMatching: string[] = [];

        constructor(public $scope: IFullViewDirectiveScope,
                    public filter: EmailsFilter) {

            this.$scope.$watch(() => this.filter, () => {
                this.matchedUsers = this.filter.getMatchedUsers(this.email);
                this.subjectMatching = this.filter.getMatchedSubject(this.email);
                this.bodyMatching = this.filter.getMatchedBody(this.email);
            }, true);
        }

        isUserMatched(user: string): boolean {
            return this.matchedUsers.indexOf(user) !== -1;
        }
    }

    var fullViewDirectiveControllerRegistration = [
        '$scope',
        'test.emails.filter',
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