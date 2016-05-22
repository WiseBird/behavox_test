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
            'test.emails.parser',
            function ($http, appSetings, emailsApi, parser) {
                $http.get(appSetings.dataUrl).then(function (response) {
                    var emails = parser.parse(response.data);
                    emailsApi.setData(emails);
                });
            }
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsLoader.js.map