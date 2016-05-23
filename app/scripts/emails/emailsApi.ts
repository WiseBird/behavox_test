/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    interface IFilterTextMatch {
        start: number;
        end: number;
    }

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

        private checkByTest(email: Email) {
            if(!this.text || !this.text.trim()) {
                return true;
            }

            var terms = this.text.trim().split(' ').map(x => x.trim());
            return terms.every(text => {
                return this.subjectToText(email, text) ||
                    this.bodyToText(email, text)
            });
        }
        private subjectToText(email: Email, text: string): boolean {
            return email.subject.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        }
        private bodyToText(email: Email, text: string): boolean {
            return email.body.toLowerCase().indexOf(text.toLowerCase()) !== -1;
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
                return this.checkByTest(email) &&
                    this.checkByUsers(email) &&
                    this.dateToRange(email);
            });
        }

        /**
         * Returns users (sender or recipients) that were directly matched by filter. If filter is empty any email will be accepted but this method will return empty list.
         * @param email
         * @returns list of users
         */
        getMatchedUsers(email: Email): string[] {
            if(!this.users || !this.users.length) {
                return [];
            }

            var result = {};
            if(this.users.indexOf(email.from) !== -1) {
                result[email.from] = true;
            }

            email.to.filter(x => this.users.indexOf(x) !== -1).forEach(x => { result[x] = true });
            email.cc.filter(x => this.users.indexOf(x) !== -1).forEach(x => { result[x] = true });
            email.bcc.filter(x => this.users.indexOf(x) !== -1).forEach(x => { result[x] = true });

            return Object.keys(result);
        }

        /**
         * Splits the subject in matched/unmatched parts. First part is unmatched one, if string matched from start then first part is empty string.
         * @param email
         * @returns unmatched and matched
         */
        getMatchedSubject(email: Email): string[] {
            var matches = this.collectTextMatches(email.subject);

            return this.splitStringByMatches(email.subject, matches);
        }
        /**
         * Splits the body in matched/unmatched parts. First part is unmatched one, if string matched from start then first part is empty string.
         * @param email
         * @returns unmatched and matched
         */
        getMatchedBody(email: Email): string[] {
            var matches = this.collectTextMatches(email.body);

            return this.splitStringByMatches(email.body, matches);
        }
        private collectTextMatches(str: string): IFilterTextMatch[] {
            if(!this.text || !this.text.trim()) {
                return [];
            }

            var matches: IFilterTextMatch[] = [];

            var terms = this.text.trim().split(' ').map(x => x.trim());
            str = str.toLowerCase();
            terms.forEach(term => {
                term = term.toLowerCase();

                var index = -1;
                while(true) {
                    index = str.indexOf(term, index + 1);
                    if(index === -1) {
                        break;
                    }

                    matches.push({start: index, end: index + term.length});
                }
            });

            this.mergeMatches(matches);

            return matches;
        }
        private mergeMatches(matches: IFilterTextMatch[]) {
            matches.sort((x,y) => x.start - y.start);

            for(let i = 0; i < matches.length - 1; i++) {
                var match = matches[i];
                var nextMatch = matches[i+1];

                var nextMatchCanBeMergedIntoCurrent = nextMatch.start >= match.start && nextMatch.start <= match.end;
                if(nextMatchCanBeMergedIntoCurrent) {
                    match.end = Math.max(match.end, nextMatch.end);
                    matches.splice(i+1, 1);
                    i--;
                }
            }
        }
        private splitStringByMatches(str: string, matches: IFilterTextMatch[]): string[] {
            matches.sort((x,y) => x.start - y.start);

            var result = [];
            var index = 0;
            matches.forEach(match => {
                result.push(str.substring(index, match.start));
                result.push(str.substring(match.start, match.end));

                index = match.end;
            });
            result.push(str.substring(index));

            return result;
        }
    }

    export interface IEmailsApi {
        setData(emails: Email[]);
        ready(): ng.IPromise<any>;

        getUsers(): string[];

        find(filter: EmailsFilter, page: number, limit: number): Test.Common.IPagedData<Email>;
        getById(id: number): Email;
        getParents(id: number): Email[];
        getChildren(id: number): Email[];

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
        getChildren(id: number): Email[] {
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