/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var FullViewDirectiveController = (function () {
            function FullViewDirectiveController($scope) {
                this.$scope = $scope;
                var i = 1;
            }
            return FullViewDirectiveController;
        })();
        var fullViewDirectiveControllerRegistration = [
            '$scope',
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
                    email: "="
                }
            };
        }
        Emails.fullViewDirectiveRegistration = [fullViewDirective];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=fullViewDirective.js.map