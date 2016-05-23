/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ViewController = (function () {
            function ViewController($scope, $stateParams, emailApi, filter) {
                this.$scope = $scope;
                this.$stateParams = $stateParams;
                this.emailApi = emailApi;
                this.filter = filter;
                this.parents = [];
                this.children = [];
                var emailId = Number(this.$stateParams.id);
                this.email = this.emailApi.getById(emailId);
                this.children = this.emailApi.getChildren(emailId).map(function (email) { return { email: email, expanded: false }; });
                if (this.email.parentId) {
                    this.parents = this.emailApi.getParents(emailId).map(function (email) { return { email: email, expanded: false }; });
                }
            }
            Object.defineProperty(ViewController.prototype, "hasParents", {
                get: function () {
                    return Boolean(this.parents && this.parents.length);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewController.prototype, "hasChildren", {
                get: function () {
                    return Boolean(this.children && this.children.length);
                },
                enumerable: true,
                configurable: true
            });
            ViewController.prototype.toggle = function (emailVM) {
                emailVM.expanded = !emailVM.expanded;
            };
            return ViewController;
        })();
        Emails.viewControllerRegistration = [
            '$scope',
            '$stateParams',
            'test.emails.api',
            'test.emails.filter',
            ViewController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=viewController.js.map