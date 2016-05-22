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
                var emailId = Number(this.$stateParams.id);
                this.email = this.emailApi.getById(emailId);
                if (this.email.parentId) {
                    this.parents = this.emailApi.getParents(emailId);
                }
            }
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