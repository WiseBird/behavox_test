/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ListSideBarController = (function () {
            function ListSideBarController($scope, filter) {
                var _this = this;
                this.$scope = $scope;
                this.filter = filter;
                this.user = "";
                this.dateFromOptions = { maxDate: null };
                this.dateFromOpened = false;
                this.dateToOptions = { minDate: null };
                this.dateToOpened = false;
                if (filter.users && filter.users.length) {
                    this.user = filter.users[0];
                }
                $scope.$watch(function () { return _this.user; }, function () {
                    if (!_this.user) {
                        _this.filter.byUsers([]);
                    }
                    else {
                        _this.filter.byUsers([_this.user]);
                    }
                });
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
            ListSideBarController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=listSideBarController.js.map