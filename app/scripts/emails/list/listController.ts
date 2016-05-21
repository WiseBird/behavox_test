/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ListController {
        emails: Email[];

        constructor(public $scope: ng.IScope,
                    public $state: angular.ui.IStateService,
                    public emailsApi: IEmailsApi,
                    public filter: EmailsFilter) {

            this.$scope.$watch(() => this.filter, () => {
                this.emails = this.emailsApi.find(filter, 1, 20).items;
            }, true);
        }

        openEmail(email: Email) {
            this.$state.go('emails.view', {id: email.id});
        }
    }

    export var listControllerRegistration = [
        '$scope',
        '$state',
        'test.emails.api',
        'test.emails.filter',
        ListController];
}
