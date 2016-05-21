/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export var emailsLoaderRunConfig = [
        '$http',
        'test.common.appSetings',
        'test.emails.api',
        function ($http: ng.IHttpService, appSetings: Test.Common.IAppSettings, emailsApi: IEmailsApi) {
            $http.get(appSetings.dataUrl).then((response: ng.IHttpPromiseCallbackArg<IEmailDTO[]>) => {
                var emails = response.data.map((x, ind) => {
                    x.id = ind;
                    return Email.fromDTO(x);
                });
                emailsApi.setData(emails);
            });
        }
    ];
}