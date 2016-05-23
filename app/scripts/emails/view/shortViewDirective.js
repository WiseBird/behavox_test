/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ShortViewDirectiveController = (function () {
            function ShortViewDirectiveController($scope, filter) {
                var _this = this;
                this.$scope = $scope;
                this.filter = filter;
                this.matchedUsers = [];
                this.matchedRecipients = [];
                this.unmatchedRecipients = [];
                this.subjectMatching = [];
                this.bodyMatching = [];
                this.recipients = this.email.getRecipients();
                this.$scope.$watch(function () { return _this.filter; }, function () {
                    _this.matchedUsers = _this.filter.getMatchedUsers(_this.email);
                    _this.fromMatched = _this.matchedUsers.indexOf(_this.email.from) !== -1;
                    _this.matchedRecipients = _this.recipients.filter(function (x) { return _this.matchedUsers.indexOf(x) !== -1; });
                    _this.unmatchedRecipients = _this.recipients.filter(function (x) { return _this.matchedUsers.indexOf(x) === -1; });
                    _this.subjectMatching = _this.filter.getMatchedSubject(_this.email);
                    _this.bodyMatching = _this.filter.getMatchedBody(_this.email);
                }, true);
            }
            return ShortViewDirectiveController;
        })();
        var shortViewDirectiveControllerRegistration = [
            '$scope',
            'test.emails.filter',
            ShortViewDirectiveController];
        function shortViewDirective() {
            return {
                templateUrl: 'scripts/emails/view/shortView.html',
                replace: true,
                restrict: 'EA',
                controller: shortViewDirectiveControllerRegistration,
                controllerAs: 'shortViewController',
                scope: {},
                bindToController: {
                    email: "=",
                    showIcons: "="
                }
            };
        }
        Emails.shortViewDirectiveRegistration = [shortViewDirective];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=shortViewDirective.js.map