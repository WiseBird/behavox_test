/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var ViewSideBarController = (function () {
            function ViewSideBarController($scope) {
                this.$scope = $scope;
            }
            return ViewSideBarController;
        })();
        Emails.viewSideBarControllerRegistration = [
            '$scope',
            ViewSideBarController];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=viewSideBarController.js.map