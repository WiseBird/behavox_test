/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var EmailsFilter = (function () {
            function EmailsFilter() {
            }
            EmailsFilter.prototype.byTest = function (text) {
                this.text = text;
                return this;
            };
            EmailsFilter.prototype.byDateFrom = function (dateFrom) {
                this.dateFrom = dateFrom;
                return this;
            };
            EmailsFilter.prototype.byDateTo = function (dateTo) {
                this.dateTo = dateTo;
                return this;
            };
            EmailsFilter.prototype.byUsers = function (users) {
                this.users = users;
                return this;
            };
            EmailsFilter.prototype.checkByTest = function (email) {
                var _this = this;
                if (!this.text || !this.text.trim()) {
                    return true;
                }
                var terms = this.text.trim().split(' ').map(function (x) { return x.trim(); });
                return terms.every(function (text) {
                    return _this.subjectToText(email, text) ||
                        _this.bodyToText(email, text);
                });
            };
            EmailsFilter.prototype.subjectToText = function (email, text) {
                return email.subject.toLowerCase().indexOf(text.toLowerCase()) !== -1;
            };
            EmailsFilter.prototype.bodyToText = function (email, text) {
                return email.body.toLowerCase().indexOf(text.toLowerCase()) !== -1;
            };
            EmailsFilter.prototype.checkByUsers = function (email) {
                var _this = this;
                if (!this.users || !this.users.length) {
                    return true;
                }
                return this.users.every(function (user) {
                    return _this.fromToUser(email, user) ||
                        _this.toToUser(email, user) ||
                        _this.ccToUser(email, user) ||
                        _this.bccToUser(email, user);
                });
            };
            EmailsFilter.prototype.fromToUser = function (email, user) {
                return email.from === user;
            };
            EmailsFilter.prototype.toToUser = function (email, user) {
                return email.to.some(function (y) { return y === user; });
            };
            EmailsFilter.prototype.ccToUser = function (email, user) {
                return email.cc.some(function (y) { return y === user; });
            };
            EmailsFilter.prototype.bccToUser = function (email, user) {
                return email.bcc.some(function (y) { return y === user; });
            };
            EmailsFilter.prototype.dateToRange = function (email) {
                if (this.dateFrom && email.date < this.dateFrom) {
                    return false;
                }
                if (this.dateTo && email.date > this.dateTo) {
                    return false;
                }
                return true;
            };
            EmailsFilter.prototype.filter = function (emails) {
                var _this = this;
                return emails.filter(function (email) {
                    return _this.checkByTest(email) &&
                        _this.checkByUsers(email) &&
                        _this.dateToRange(email);
                });
            };
            /**
             * Returns users (sender or recipients) that were directly matched by filter. If filter is empty any email will be accepted but this method will return empty list.
             * @param email
             * @returns list of users
             */
            EmailsFilter.prototype.getMatchedUsers = function (email) {
                var _this = this;
                if (!this.users || !this.users.length) {
                    return [];
                }
                var result = {};
                if (this.users.indexOf(email.from) !== -1) {
                    result[email.from] = true;
                }
                email.to.filter(function (x) { return _this.users.indexOf(x) !== -1; }).forEach(function (x) { result[x] = true; });
                email.cc.filter(function (x) { return _this.users.indexOf(x) !== -1; }).forEach(function (x) { result[x] = true; });
                email.bcc.filter(function (x) { return _this.users.indexOf(x) !== -1; }).forEach(function (x) { result[x] = true; });
                return Object.keys(result);
            };
            /**
             * Splits the subject in matched/unmatched parts. First part is unmatched one, if string matched from start then first part is empty string.
             * @param email
             * @returns unmatched and matched
             */
            EmailsFilter.prototype.getMatchedSubject = function (email) {
                var matches = this.collectTextMatches(email.subject);
                return this.splitStringByMatches(email.subject, matches);
            };
            /**
             * Splits the body in matched/unmatched parts. First part is unmatched one, if string matched from start then first part is empty string.
             * @param email
             * @returns unmatched and matched
             */
            EmailsFilter.prototype.getMatchedBody = function (email) {
                var matches = this.collectTextMatches(email.body);
                return this.splitStringByMatches(email.body, matches);
            };
            EmailsFilter.prototype.collectTextMatches = function (str) {
                if (!this.text || !this.text.trim()) {
                    return [];
                }
                var matches = [];
                var terms = this.text.trim().split(' ').map(function (x) { return x.trim(); });
                str = str.toLowerCase();
                terms.forEach(function (term) {
                    term = term.toLowerCase();
                    var index = -1;
                    while (true) {
                        index = str.indexOf(term, index + 1);
                        if (index === -1) {
                            break;
                        }
                        matches.push({ start: index, end: index + term.length });
                    }
                });
                this.mergeMatches(matches);
                return matches;
            };
            EmailsFilter.prototype.mergeMatches = function (matches) {
                matches.sort(function (x, y) { return x.start - y.start; });
                for (var i = 0; i < matches.length - 1; i++) {
                    var match = matches[i];
                    var nextMatch = matches[i + 1];
                    var nextMatchCanBeMergedIntoCurrent = nextMatch.start >= match.start && nextMatch.start <= match.end;
                    if (nextMatchCanBeMergedIntoCurrent) {
                        match.end = Math.max(match.end, nextMatch.end);
                        matches.splice(i + 1, 1);
                        i--;
                    }
                }
            };
            EmailsFilter.prototype.splitStringByMatches = function (str, matches) {
                matches.sort(function (x, y) { return x.start - y.start; });
                var result = [];
                var index = 0;
                matches.forEach(function (match) {
                    result.push(str.substring(index, match.start));
                    result.push(str.substring(match.start, match.end));
                    index = match.end;
                });
                result.push(str.substring(index));
                return result;
            };
            return EmailsFilter;
        })();
        Emails.EmailsFilter = EmailsFilter;
        var EmailsApi = (function () {
            function EmailsApi($q) {
                this.$q = $q;
                this.emails = null;
                this.users = null;
                this.defer = null;
                this.defer = this.$q.defer();
            }
            EmailsApi.prototype.ready = function () {
                return this.defer.promise;
            };
            EmailsApi.prototype.setData = function (emails) {
                this.emails = emails;
                this.collectUsers();
                this.defer.resolve(null);
            };
            EmailsApi.prototype.collectUsers = function () {
                var users = {};
                this.emails.forEach(function (email) {
                    if (email.from) {
                        users[email.from] = true;
                    }
                    if (email.to) {
                        email.to.forEach(function (user) {
                            users[user] = true;
                        });
                    }
                    if (email.cc) {
                        email.cc.forEach(function (user) {
                            users[user] = true;
                        });
                    }
                    if (email.bcc) {
                        email.bcc.forEach(function (user) {
                            users[user] = true;
                        });
                    }
                });
                this.users = Object.keys(users);
            };
            EmailsApi.prototype.getUsers = function () {
                return this.users;
            };
            EmailsApi.prototype.find = function (filter, page, limit) {
                if (!filter) {
                    throw new Error('filter is missing');
                }
                var emails = filter.filter(this.emails);
                var itemsOnPage = emails.filter(function (item, ind) {
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
            };
            EmailsApi.prototype.getById = function (id) {
                for (var i = 0; i < this.emails.length; i++) {
                    if (this.emails[i].id === id) {
                        return this.emails[i];
                    }
                }
                return null;
            };
            EmailsApi.prototype.getParents = function (id) {
                var message = this.getById(id);
                if (!message) {
                    return [];
                }
                var parents = [];
                while (message.parentId) {
                    var parent = this.getById(message.parentId);
                    if (!parent) {
                        break;
                    }
                    parents.push(parent);
                    message = parent;
                }
                return parents;
            };
            EmailsApi.prototype.getChildren = function (id) {
                var message = this.getById(id);
                if (!message) {
                    return [];
                }
                return this.emails.filter(function (x) { return x.parentId === message.id; });
            };
            EmailsApi.prototype.getMinDate = function () {
                var date = null;
                this.emails.forEach(function (email) {
                    if (!email.date) {
                        return;
                    }
                    if (!date || date > email.date) {
                        date = email.date;
                    }
                });
                return date;
            };
            EmailsApi.prototype.getMaxDate = function () {
                var date = null;
                this.emails.forEach(function (email) {
                    if (!email.date) {
                        return;
                    }
                    if (!date || date < email.date) {
                        date = email.date;
                    }
                });
                return date;
            };
            return EmailsApi;
        })();
        Emails.emailsApiRegistration = [
            '$q',
            EmailsApi
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsApi.js.map