/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ListController {
        emails: Email[];
        pagination: Test.Common.IPagination;

        constructor(public $scope: ng.IScope,
                    public $state: angular.ui.IStateService,
                    public $window: ng.IWindowService,
                    public emailsApi: IEmailsApi,
                    public filter: EmailsFilter) {

            this.$scope.$watch(() => this.filter, this.reloadEmails.bind(this), true);
        }

        reloadEmails() {
            this.emails = this.loadEmails();
        }
        loadEmails(page: number = 1): Email[] {
            var data = this.emailsApi.find(this.filter, page, 20);
            this.pagination = data.pagination;
            return data.items;
        }

        openEmail($event: ng.IAngularEvent, email: Email) {
            var event = <JQueryMouseEventObject><any>$event;
            if(event.which === 2) {
                var url = this.$state.href('emails.view', {id: email.id});
                this.$window.open(url, '_blank');

                $event.preventDefault();
            } else {
                this.$state.go('emails.view', {id: email.id});
            }
        }

        canLoadNextPage(): boolean {
            return this.pagination && this.pagination.page < this.pagination.pages;
        }
        loadNextPage() {
            if(!this.canLoadNextPage()) {
                return;
            }

            var newEmails = this.loadEmails(this.pagination.page + 1);
            this.emails.push.apply(this.emails, newEmails);
        }
    }

    export var listControllerRegistration = [
        '$scope',
        '$state',
        '$window',
        'test.emails.api',
        'test.emails.filter',
        ListController];
}
