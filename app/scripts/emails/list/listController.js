/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ListController = (function () {
            function ListController($scope, emailsApi, filter) {
                var _this = this;
                this.$scope = $scope;
                this.emailsApi = emailsApi;
                this.filter = filter;
                this.$scope.$watch(function () { return _this.filter; }, function () {
                    _this.emails = _this.emailsApi.find(filter, 1, 20).items;
                }, true);
            }
            return ListController;
        })();
        Emails.listControllerRegistration = [
            '$scope',
            'test.emails.api',
            'test.emails.filter',
            ListController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=listController.js.map