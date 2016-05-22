/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ListSideBarController {
        user: string = "";

        dateFromOptions = { maxDate: null };
        dateFromOpened: boolean = false;
        dateToOptions = { minDate: null };
        dateToOpened: boolean = false;

        constructor(public $scope: ng.IScope,
                    public filter: EmailsFilter) {

            if(filter.users && filter.users.length) {
                this.user = filter.users[0];
            }

            $scope.$watch(() => this.user, () => {
                if(!this.user) {
                    this.filter.byUsers([]);
                } else {
                    this.filter.byUsers([this.user]);
                }
            });

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
        ListSideBarController];
}
