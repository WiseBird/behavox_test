/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ViewController = (function () {
            function ViewController($scope, emailApi, filter) {
                //this.email = this.emailApi.getById(1);
                this.$scope = $scope;
                this.emailApi = emailApi;
                this.filter = filter;
            }
            return ViewController;
        })();
        Emails.viewControllerRegistration = [
            '$scope',
            'test.emails.api',
            'test.emails.filter',
            ViewController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=viewController.js.map