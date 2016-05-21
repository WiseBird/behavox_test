/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ListController {
        emails: Email[];

        constructor(public $scope: ng.IScope,
                    public emailsApi: IEmailsApi,
                    public filter: EmailsFilter) {

            this.$scope.$watch(() => this.filter, () => {
                this.emails = this.emailsApi.find(filter, 1, 20).items;
            }, true);
        }
    }

    export var listControllerRegistration = [
        '$scope',
        'test.emails.api',
        'test.emails.filter',
        ListController];
}
