/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ListSideBarController {
        users: string[];

        dateFromOptions = { maxDate: null };
        dateFromOpened: boolean = false;
        dateToOptions = { minDate: null };
        dateToOpened: boolean = false;

        constructor(public $scope: ng.IScope,
                    public filter: EmailsFilter,
                    public emailsApi: IEmailsApi) {

            this.users = this.emailsApi.getUsers();

            $scope.$watch(() => this.filter.dateFrom, () => {
               this.dateToOptions.minDate = this.filter.dateFrom;
            });
            $scope.$watch(() => this.filter.dateTo, () => {
               this.dateFromOptions.maxDate = this.filter.dateTo;
            });
        }
    }

    export var listSideBarControllerRegistration = [
        '$scope',
        'test.emails.filter',
        'test.emails.api',
        ListSideBarController];
}
