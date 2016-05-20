/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export class EmailsFilter extends Common.Filter {
        private text: string;
        private dateFrom: Date;
        private dateTo: Date;
        private usersFrom: string[];
        private usersTo: string[];
        private usersCc: string[];
        private usersBcc: string[];

        byTest(text: string): this & EmailsFilter {
            this.text = text;
            return this;
        }

        byDateFrom(dateFrom: Date): this & EmailsFilter {
            this.dateFrom = dateFrom;
            return this;
        }
        byDateTo(dateTo: Date): this & EmailsFilter {
            this.dateTo = dateTo;
            return this;
        }

        byUsersFrom(usersFrom: string[]): this & EmailsFilter {
            this.usersFrom = usersFrom;
            return this;
        }
        byUsersTo(usersTo: string[]): this & EmailsFilter {
            this.usersTo = usersTo;
            return this;
        }
        byUsersCc(usersCc: string[]): this & EmailsFilter {
            this.usersCc = usersCc;
            return this;
        }
        byUsersBcc(usersBcc: string[]): this & EmailsFilter {
            this.usersBcc = usersBcc;
            return this;
        }

        filter(emails: Email[]): Common.IPagedDataDto<Email> {


            return super.filter<Email>(emails);
        }
    }

    export interface IEmailsApi {
        setData(emails: Email[]);

        find(filter: EmailsFilter): Common.IPagedDataDto<Email>;
    }

    class EmailsApi implements IEmailsApi {
        private emails: Email[] = [];

        setData(emails: Email[]) {
            this.emails = emails;
        }

        find(filter: EmailsFilter): Common.IPagedDataDto<Email> {
            if(!filter) {
                throw new Error('filter is missing');
            }

            return filter.filter(this.emails);
        }
    }

    export var emailsApiRegistration = [
        EmailsApi
    ];
}