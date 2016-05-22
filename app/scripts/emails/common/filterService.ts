/// <reference path="../../tsd.d.ts" />

module Test.Emails.Common {
    'use strict';

    function filterService(emailsApi: IEmailsApi): EmailsFilter {
        var filter = new EmailsFilter();

        filter.byDateFrom(emailsApi.getMinDate());
        filter.byDateTo(emailsApi.getMaxDate());

        return filter;
    }

    export var filterServiceRegistration = [
        'test.emails.api',
        filterService];
}