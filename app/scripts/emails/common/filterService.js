/// <reference path="../../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        var Common;
        (function (Common) {
            'use strict';
            function filterService(emailsApi) {
                var filter = new Emails.EmailsFilter();
                filter.byDateFrom(emailsApi.getMinDate());
                filter.byDateTo(emailsApi.getMaxDate());
                return filter;
            }
            Common.filterServiceRegistration = [
                'test.emails.api',
                filterService];
        })(Common = Emails.Common || (Emails.Common = {}));
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=filterService.js.map