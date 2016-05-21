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
                $scope.$watch(function () { return _this.user; }, function () {
                    if (!_this.user) {
                        _this.filter.byUsers([]);
                    }
                    else {
                        _this.filter.byUsers([_this.user]);
                    }
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