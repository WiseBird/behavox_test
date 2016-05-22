/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export var emailsLoaderRunConfig = [
        '$http',
        'test.common.appSetings',
        'test.emails.api',
        'test.emails.parser',
        function ($http: ng.IHttpService, appSetings: Test.Common.IAppSettings, emailsApi: IEmailsApi, parser: IEmailsParser) {
            $http.get(appSetings.dataUrl).then((response: ng.IHttpPromiseCallbackArg<IEmailDTO[]>) => {
                var emails = parser.parse(response.data);

                emailsApi.setData(emails);
            });
        }
    ];
}