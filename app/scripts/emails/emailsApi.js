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
            EmailsFilter.prototype.subjectToText = function (email) {
                if (!this.text) {
                    return true;
                }
                return email.subject.toLowerCase().indexOf(this.text.toLowerCase()) !== -1;
            };
            EmailsFilter.prototype.bodyToText = function (email) {
                if (!this.text) {
                    return true;
                }
                return email.body.toLowerCase().indexOf(this.text.toLowerCase()) !== -1;
            };
            EmailsFilter.prototype.fromToUsers = function (email) {
                if (!this.users || !this.users.length) {
                    return true;
                }
                return this.users.some(function (x) { return email.from.indexOf(x) !== -1; });
            };
            EmailsFilter.prototype.toToUsers = function (email) {
                if (!this.users || !this.users.length) {
                    return true;
                }
                return this.users.some(function (x) { return email.to.some(function (y) { return y.indexOf(x) !== -1; }); });
            };
            EmailsFilter.prototype.ccToUsers = function (email) {
                if (!this.users || !this.users.length) {
                    return true;
                }
                return this.users.some(function (x) { return email.cc.some(function (y) { return y.indexOf(x) !== -1; }); });
            };
            EmailsFilter.prototype.bccToUsers = function (email) {
                if (!this.users || !this.users.length) {
                    return true;
                }
                return this.users.some(function (x) { return email.bcc.some(function (y) { return y.indexOf(x) !== -1; }); });
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
                    return (_this.bodyToText(email) || _this.subjectToText(email)) &&
                        (_this.fromToUsers(email) || _this.toToUsers(email) || _this.ccToUsers(email) || _this.bccToUsers(email)) &&
                        _this.dateToRange(email);
                });
            };
            return EmailsFilter;
        })();
        Emails.EmailsFilter = EmailsFilter;
        var EmailsApi = (function () {
            function EmailsApi($q) {
                this.$q = $q;
                this.emails = null;
                this.defer = null;
                this.defer = this.$q.defer();
            }
            EmailsApi.prototype.ready = function () {
                return this.defer.promise;
            };
            EmailsApi.prototype.setData = function (emails) {
                this.emails = emails;
                this.defer.resolve(null);
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
            EmailsApi.prototype.getChildrens = function (id) {
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