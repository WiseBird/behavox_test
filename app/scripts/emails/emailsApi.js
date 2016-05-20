/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var EmailsApi = (function () {
            function EmailsApi() {
            }
            EmailsApi.prototype.setData = function (emails) {
                this.emails = emails;
            };
            return EmailsApi;
        })();
        Emails.emailsApiRegistration = [
            EmailsApi
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsApi.js.map