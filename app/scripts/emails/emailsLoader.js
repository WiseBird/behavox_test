/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        Emails.emailsLoaderRunConfig = [
            '$http',
            'test.common.appSetings',
            'test.emails.api',
            function ($http, appSetings, emailsApi) {
                $http.get(appSetings.dataUrl).then(function (response) {
                    var emails = response.data.map(function (x) { return Emails.Email.fromDTO(x); });
                    emailsApi.setData(emails);
                });
            }
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsLoader.js.map