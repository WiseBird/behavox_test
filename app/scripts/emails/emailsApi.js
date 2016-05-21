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
            EmailsFilter.prototype.filter = function (emails) {
                var _this = this;
                return emails.filter(function (email) {
                    return (_this.bodyToText(email) || _this.subjectToText(email)) &&
                        (_this.fromToUsers(email) || _this.toToUsers(email) || _this.ccToUsers(email) || _this.bccToUsers(email));
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
            return EmailsApi;
        })();
        Emails.emailsApiRegistration = [
            '$q',
            EmailsApi
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsApi.js.map