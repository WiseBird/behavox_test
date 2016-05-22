/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var FullViewDirectiveController = (function () {
            function FullViewDirectiveController($scope, filter) {
                var _this = this;
                this.$scope = $scope;
                this.filter = filter;
                this.matchedUsers = [];
                this.$scope.$watch(function () { return _this.filter; }, function () {
                    _this.matchedUsers = _this.filter.getMatchedUsers(_this.email);
                }, true);
            }
            FullViewDirectiveController.prototype.isUserMatched = function (user) {
                return this.matchedUsers.indexOf(user) !== -1;
            };
            return FullViewDirectiveController;
        })();
        var fullViewDirectiveControllerRegistration = [
            '$scope',
            'test.emails.filter',
            FullViewDirectiveController];
        function fullViewDirective() {
            return {
                templateUrl: 'scripts/emails/view/fullView.html',
                replace: true,
                restrict: 'EA',
                controller: fullViewDirectiveControllerRegistration,
                controllerAs: 'fullViewController',
                scope: {},
                bindToController: {
                    email: "=",
                    preview: "="
                }
            };
        }
        Emails.fullViewDirectiveRegistration = [fullViewDirective];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=fullViewDirective.js.map