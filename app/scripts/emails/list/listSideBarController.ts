/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ListSideBarController {
        user: string = "";

        constructor(public $scope: ng.IScope,
                    public filter: EmailsFilter) {

            $scope.$watch(() => this.user, () => {
                if(!this.user) {
                    this.filter.byUsers([]);
                } else {
                    this.filter.byUsers([this.user]);
                }
            });
        }
    }

    export var listSideBarControllerRegistration = [
        '$scope',
        'test.emails.filter',
        ListSideBarController];
}
