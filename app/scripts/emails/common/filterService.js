/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        var Common;
        (function (Common) {
            'use strict';
            function filterService() {
                return new Emails.EmailsFilter();
            }
            Common.filterServiceRegistration = [
                filterService];
        })(Common = Emails.Common || (Emails.Common = {}));
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=filterService.js.map