/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IEmailVM {
        email: Email;
        expanded: boolean;
    }

    interface IViewStateParams extends angular.ui.IStateParamsService {
        id: string;
    }

    class ViewController {
        email: Email;
        parents: IEmailVM[] = [];
        children: IEmailVM[] = [];

        constructor(public $scope: ng.IScope,
                    public $stateParams: IViewStateParams,
                    public emailApi: IEmailsApi,
                    public filter: EmailsFilter) {

            var emailId = Number(this.$stateParams.id);
            this.email = this.emailApi.getById(emailId);

            this.children = this.emailApi.getChildren(emailId).map(email => <IEmailVM>{ email: email, expanded: false});
            if(this.email.parentId) {
                this.parents = this.emailApi.getParents(emailId).map(email => <IEmailVM>{ email: email, expanded: false});
            }
        }

        get hasParents(): boolean {
            return Boolean(this.parents && this.parents.length);
        }
        get hasChildren(): boolean {
            return Boolean(this.children && this.children.length);
        }

        toggle(emailVM: IEmailVM) {
            emailVM.expanded = !emailVM.expanded;
        }
    }

    export var viewControllerRegistration = [
        '$scope',
        '$stateParams',
        'test.emails.api',
        'test.emails.filter',
        ViewController];
}
