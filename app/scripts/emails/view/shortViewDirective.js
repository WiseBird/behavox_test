/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ShortViewDirectiveController = (function () {
            function ShortViewDirectiveController($scope) {
                this.$scope = $scope;
            }
            ShortViewDirectiveController.prototype.emailRecipients = function () {
                var result = [];
                result = result.concat(this.email.to);
                result = result.concat(this.email.cc);
                result = result.concat(this.email.bcc);
                return result.join(" ");
            };
            return ShortViewDirectiveController;
        })();
        var shortViewDirectiveControllerRegistration = [
            '$scope',
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
                    email: "="
                }
            };
        }
        Emails.shortViewDirectiveRegistration = [shortViewDirective];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=shortViewDirective.js.map