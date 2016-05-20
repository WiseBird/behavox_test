/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export interface IEmailsApi {
        setData(emails: Email[]);
    }

    class EmailsApi implements IEmailsApi {
        private emails: Email[];

        setData(emails: Email[]) {
            this.emails = emails;
        }
    }

    export var emailsApiRegistration = [
        EmailsApi
    ];
}