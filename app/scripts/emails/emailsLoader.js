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
                    var emails = response.data.map(function (x, ind) {
                        x.id = ind;
                        return Emails.Email.fromDTO(x);
                    });
                    emails.sort(function (a, b) {
                        if (a.date > b.date) {
                            return -1;
                        }
                        else if (a.date < b.date) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    });
                    emailsApi.setData(emails);
                });
            }
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsLoader.js.map