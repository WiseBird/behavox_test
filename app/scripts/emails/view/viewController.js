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
                var emailId = Number(this.$stateParams.id);
                this.email = this.emailApi.getById(emailId);
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