/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IViewStateParams extends angular.ui.IStateParamsService {
        id: string;
    }

    class ViewController {
        email: Email;

        constructor(public $scope: ng.IScope,
                    public $stateParams: IViewStateParams,
                    public emailApi: IEmailsApi,
                    public filter: EmailsFilter) {

            var emailId = Number(this.$stateParams.id);
            this.email = this.emailApi.getById(emailId);
        }
    }

    export var viewControllerRegistration = [
        '$scope',
        '$stateParams',
        'test.emails.api',
        'test.emails.filter',
        ViewController];
}
