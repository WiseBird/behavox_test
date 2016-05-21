/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ViewController {
        email: Email;

        constructor(public $scope: ng.IScope,
                    public emailApi: IEmailsApi,
                    public filter: EmailsFilter) {

            //this.email = this.emailApi.getById(1);

        }
    }

    export var viewControllerRegistration = [
        '$scope',
        'test.emails.api',
        'test.emails.filter',
        ViewController];
}
