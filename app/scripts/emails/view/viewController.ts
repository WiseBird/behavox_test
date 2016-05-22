/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IViewStateParams extends angular.ui.IStateParamsService {
        id: string;
    }

    class ViewController {
        email: Email;
        parents: Email[] = [];
        children: Email[] = [];

        constructor(public $scope: ng.IScope,
                    public $stateParams: IViewStateParams,
                    public emailApi: IEmailsApi,
                    public filter: EmailsFilter) {

            var emailId = Number(this.$stateParams.id);
            this.email = this.emailApi.getById(emailId);

            this.children = this.emailApi.getChildrens(emailId);
            if(this.email.parentId) {
                this.parents = this.emailApi.getParents(emailId);
            }
        }

        get hasParents(): boolean {
            return Boolean(this.parents && this.parents.length);
        }
        get hasChildren(): boolean {
            return Boolean(this.children && this.children.length);
        }
    }

    export var viewControllerRegistration = [
        '$scope',
        '$stateParams',
        'test.emails.api',
        'test.emails.filter',
        ViewController];
}
