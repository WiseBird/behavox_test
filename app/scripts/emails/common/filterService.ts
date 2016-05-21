/// <reference path="../../tsd.d.ts" />

module Test.Emails.Common {
    'use strict';

    function filterService(): EmailsFilter {
        return new EmailsFilter();
    }

    export var filterServiceRegistration = [
        filterService];
}