/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ListController = (function () {
            function ListController($scope, $state, $window, emailsApi, filter) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.$window = $window;
                this.emailsApi = emailsApi;
                this.filter = filter;
                this.$scope.$watch(function () { return _this.filter; }, this.reloadEmails.bind(this), true);
            }
            ListController.prototype.reloadEmails = function () {
                this.emails = this.loadEmails();
            };
            ListController.prototype.loadEmails = function (page) {
                if (page === void 0) { page = 1; }
                var data = this.emailsApi.find(this.filter, page, 20);
                this.pagination = data.pagination;
                return data.items;
            };
            ListController.prototype.openEmail = function ($event, email) {
                var event = $event;
                if (event.which === 2) {
                    var url = this.$state.href('emails.view', { id: email.id });
                    this.$window.open(url, '_blank');
                    $event.preventDefault();
                }
                else {
                    this.$state.go('emails.view', { id: email.id });
                }
            };
            ListController.prototype.canLoadNextPage = function () {
                return this.pagination && this.pagination.page < this.pagination.pages;
            };
            ListController.prototype.loadNextPage = function () {
                if (!this.canLoadNextPage()) {
                    return;
                }
                var newEmails = this.loadEmails(this.pagination.page + 1);
                this.emails.push.apply(this.emails, newEmails);
            };
            return ListController;
        })();
        Emails.listControllerRegistration = [
            '$scope',
            '$state',
            '$window',
            'test.emails.api',
            'test.emails.filter',
            ListController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=listController.js.map