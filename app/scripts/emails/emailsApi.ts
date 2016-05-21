/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export class EmailsFilter {
        private text: string;
        private dateFrom: Date;
        private dateTo: Date;

        private users: string[];
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

        byUsers(users: string[]): this & EmailsFilter {
            this.users = users;
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

        private subjectToText(email: Email): boolean {
            if(!this.text) {
                return true;
            }

            return email.subject.indexOf(this.text) !== -1;
        }
        private bodyToText(email: Email): boolean {
            if(!this.text) {
                return true;
            }

            return email.body.indexOf(this.text) !== -1;
        }

        private fromToUsers(email: Email): boolean {
            if(!this.users || !this.users.length) {
                return true;
            }

            return this.users.some(x => email.from.indexOf(x) !== -1);
        }
        private toToUsers(email: Email): boolean {
            if(!this.users || !this.users.length) {
                return true;
            }

            return this.users.some(x => email.to.some(y => y.indexOf(x) !== -1));
        }
        private ccToUsers(email: Email): boolean {
            if(!this.users || !this.users.length) {
                return true;
            }

            return this.users.some(x => email.cc.some(y => y.indexOf(x) !== -1));
        }
        private bccToUsers(email: Email): boolean {
            if(!this.users || !this.users.length) {
                return true;
            }

            return this.users.some(x => email.bcc.some(y => y.indexOf(x) !== -1));
        }

        filter(emails: Email[]): Email[] {
            return emails.filter((email) => {
                return this.bodyToText(email) && this.subjectToText(email) &&
                    this.fromToUsers(email) && this.toToUsers(email) && this.ccToUsers(email) && this.bccToUsers(email);
            });
        }
    }

    export interface IEmailsApi {
        setData(emails: Email[]);

        find(filter: EmailsFilter, page: number, limit: number): Test.Common.IPagedDataDto<Email>;
    }

    class EmailsApi implements IEmailsApi {
        private emails: Email[] = [];

        setData(emails: Email[]) {
            this.emails = emails;
        }

        find(filter: EmailsFilter, page: number, limit: number): Test.Common.IPagedDataDto<Email> {
            if(!filter) {
                throw new Error('filter is missing');
            }

            var emails = filter.filter(this.emails);

            var itemsOnPage = emails.filter((item: Email, ind: number): boolean => {
                return ind >= (page - 1) * limit && ind < page * limit;
            });

            return {
                limit: limit,
                page: page,
                pages: Math.ceil(emails.length / limit),
                total: emails.length,

                items: itemsOnPage
            };
        }
    }

    export var emailsApiRegistration = [
        EmailsApi
    ];
}