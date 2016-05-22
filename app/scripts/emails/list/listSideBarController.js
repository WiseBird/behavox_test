/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ListSideBarController = (function () {
            function ListSideBarController($scope, filter, emailsApi) {
                var _this = this;
                this.$scope = $scope;
                this.filter = filter;
                this.emailsApi = emailsApi;
                this.dateFromOptions = { maxDate: null };
                this.dateFromOpened = false;
                this.dateToOptions = { minDate: null };
                this.dateToOpened = false;
                this.users = this.emailsApi.getUsers();
                $scope.$watch(function () { return _this.filter.dateFrom; }, function () {
                    _this.dateToOptions.minDate = _this.filter.dateFrom;
                });
                $scope.$watch(function () { return _this.filter.dateTo; }, function () {
                    _this.dateFromOptions.maxDate = _this.filter.dateTo;
                });
            }
            return ListSideBarController;
        })();
        Emails.listSideBarControllerRegistration = [
            '$scope',
            'test.emails.filter',
            'test.emails.api',
            ListSideBarController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=listSideBarController.js.map