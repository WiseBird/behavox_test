/// <reference path="../tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var EmailsFilter = (function (_super) {
            __extends(EmailsFilter, _super);
            function EmailsFilter() {
                _super.apply(this, arguments);
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
            EmailsFilter.prototype.byUsersFrom = function (usersFrom) {
                this.usersFrom = usersFrom;
                return this;
            };
            EmailsFilter.prototype.byUsersTo = function (usersTo) {
                this.usersTo = usersTo;
                return this;
            };
            EmailsFilter.prototype.byUsersCc = function (usersCc) {
                this.usersCc = usersCc;
                return this;
            };
            EmailsFilter.prototype.byUsersBcc = function (usersBcc) {
                this.usersBcc = usersBcc;
                return this;
            };
            EmailsFilter.prototype.filter = function (emails) {
                return _super.prototype.filter.call(this, emails);
            };
            return EmailsFilter;
        })(Test.Common.Filter);
        Emails.EmailsFilter = EmailsFilter;
        var EmailsApi = (function () {
            function EmailsApi() {
                this.emails = [];
            }
            EmailsApi.prototype.setData = function (emails) {
                this.emails = emails;
            };
            EmailsApi.prototype.find = function (filter) {
                if (!filter) {
                    throw new Error('filter is missing');
                }
                return filter.filter(this.emails);
            };
            return EmailsApi;
        })();
        Emails.emailsApiRegistration = [
            EmailsApi
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsApi.js.map