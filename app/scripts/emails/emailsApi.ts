/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export class EmailsFilter {
        text: string;
        dateFrom: Date;
        dateTo: Date;

        users: string[];

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

        private subjectToText(email: Email): boolean {
            if(!this.text) {
                return true;
            }

            return email.subject.toLowerCase().indexOf(this.text.toLowerCase()) !== -1;
        }
        private bodyToText(email: Email): boolean {
            if(!this.text) {
                return true;
            }

            return email.body.toLowerCase().indexOf(this.text.toLowerCase()) !== -1;
        }

        private checkByUsers(email: Email): boolean {
            if(!this.users || !this.users.length) {
                return true;
            }

            return this.users.every(user => {
                return this.fromToUser(email, user) ||
                    this.toToUser(email, user) ||
                    this.ccToUser(email, user) ||
                    this.bccToUser(email, user)
            });
        }
        private fromToUser(email: Email, user: string): boolean {
             return email.from === user;
        }
        private toToUser(email: Email, user: string): boolean {
            return email.to.some(y => y === user);
        }
        private ccToUser(email: Email, user: string): boolean {
            return email.cc.some(y => y === user)
        }
        private bccToUser(email: Email, user: string): boolean {
            return email.bcc.some(y => y === user)
        }

        private dateToRange(email: Email): boolean {
            if(this.dateFrom && email.date < this.dateFrom) {
                return false;
            }

            if(this.dateTo && email.date > this.dateTo) {
                return false;
            }

            return true;
        }

        filter(emails: Email[]): Email[] {
            return emails.filter((email) => {
                return (this.bodyToText(email) || this.subjectToText(email)) &&
                    this.checkByUsers(email) &&
                    this.dateToRange(email);
            });
        }
    }

    export interface IEmailsApi {
        setData(emails: Email[]);
        ready(): ng.IPromise<any>;

        getUsers(): string[];

        find(filter: EmailsFilter, page: number, limit: number): Test.Common.IPagedData<Email>;
        getById(id: number): Email;
        getParents(id: number): Email[];
        getChildrens(id: number): Email[];

        getMinDate(): Date;
        getMaxDate(): Date;
    }

    class EmailsApi implements IEmailsApi {
        private emails: Email[] = null;
        private users: string[] = null;
        private defer: ng.IDeferred<any> = null;

        constructor(private $q: ng.IQService) {
            this.defer = this.$q.defer<any>();
        }

        ready(): ng.IPromise<any> {
            return this.defer.promise;
        }
        setData(emails: Email[]) {
            this.emails = emails;

            this.collectUsers();

            this.defer.resolve(null);
        }
        private collectUsers() {
            var users = {};

            this.emails.forEach(email => {
                if(email.from) {
                    users[email.from] = true;
                }

                if(email.to) {
                    email.to.forEach(user => {
                        users[user] = true;
                    });
                }
                if(email.cc) {
                    email.cc.forEach(user => {
                        users[user] = true;
                    });
                }
                if(email.bcc) {
                    email.bcc.forEach(user => {
                        users[user] = true;
                    });
                }
            });

            this.users = Object.keys(users);
        }

        getUsers(): string[] {
            return this.users;
        }

        find(filter: EmailsFilter, page: number, limit: number): Test.Common.IPagedData<Email> {
            if(!filter) {
                throw new Error('filter is missing');
            }

            var emails = filter.filter(this.emails);

            var itemsOnPage = emails.filter((item: Email, ind: number): boolean => {
                return ind >= (page - 1) * limit && ind < page * limit;
            });

            return {
                pagination: {
                    limit: limit,
                    page: page,
                    pages: Math.ceil(emails.length / limit),
                    total: emails.length
                },

                items: itemsOnPage
            };
        }
        getById(id: number): Email {
            for(let i = 0; i < this.emails.length; i++) {
                if(this.emails[i].id === id) {
                    return this.emails[i];
                }
            }

            return null;
        }

        getParents(id: number): Email[] {
            var message = this.getById(id);
            if(!message) {
                return [];
            }

            var parents: Email[] = [];
            while(message.parentId) {
                var parent = this.getById(message.parentId);
                if(!parent) {
                    break;
                }

                parents.push(parent);
                message = parent;
            }

            return parents;
        }

        getChildrens(id: number): Email[] {
            var message = this.getById(id);
            if(!message) {
                return [];
            }

            return this.emails.filter(x => x.parentId === message.id);
        }

        getMinDate(): Date {
            var date: Date = null;

            this.emails.forEach(email => {
                if(!email.date) {
                    return;
                }

                if(!date || date > email.date) {
                    date = email.date;
                }
            });

            return date;
        }
        getMaxDate(): Date {
            var date: Date = null;

            this.emails.forEach(email => {
                if(!email.date) {
                    return;
                }

                if(!date || date < email.date) {
                    date = email.date;
                }
            });

            return date;
        }
    }

    export var emailsApiRegistration = [
        '$q',
        EmailsApi
    ];
}