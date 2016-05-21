/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ListController = (function () {
            function ListController($scope, $state, emailsApi, filter) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.emailsApi = emailsApi;
                this.filter = filter;
                this.$scope.$watch(function () { return _this.filter; }, function () {
                    _this.emails = _this.emailsApi.find(filter, 1, 20).items;
                }, true);
            }
            ListController.prototype.openEmail = function (email) {
                this.$state.go('emails.view', { id: email.id });
            };
            return ListController;
        })();
        Emails.listControllerRegistration = [
            '$scope',
            '$state',
            'test.emails.api',
            'test.emails.filter',
            ListController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=listController.js.map