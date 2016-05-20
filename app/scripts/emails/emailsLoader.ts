/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export var emailsLoaderRunConfig = [
        '$http',
        'test.common.appSetings',
        'test.emails.api',
        function ($http: ng.IHttpService, appSetings: Common.IAppSettings, emailsApi: IEmailsApi) {
            $http.get(appSetings.dataUrl).then((response: ng.IHttpPromiseCallbackArg<IEmailDTO[]>) => {
                var emails = response.data.map(x => Email.fromDTO(x));
                emailsApi.setData(emails);
            });
        }
    ];
}