/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var EmailsParser = (function () {
            function EmailsParser(appSetings) {
                this.appSetings = appSetings;
                this.sendersEmails = {};
            }
            EmailsParser.prototype.parse = function (dtos) {
                this.setIdsToDtos(dtos);
                this.extractParentEmails(dtos);
                var emails = this.convertDtos(dtos);
                this.sortEmails(emails);
                return emails;
            };
            EmailsParser.prototype.setIdsToDtos = function (dtos) {
                dtos.forEach(function (dto, ind) {
                    dto.id = ind + 1;
                });
            };
            EmailsParser.prototype.extractParentEmails = function (dtos) {
                var _this = this;
                dtos.forEach(function (dto) {
                    if (!dto.body) {
                        return;
                    }
                    var messages = dto.body.split(_this.appSetings.parentMessageDelimiter);
                    messages.forEach(function (x) {
                        x.trim();
                    });
                    dto.body = messages[0];
                    for (var i = 1; i < messages.length; i++) {
                    }
                });
            };
            EmailsParser.prototype.convertDtos = function (dtos) {
                return dtos.map(function (x, ind) { return Emails.Email.fromDTO(x); });
            };
            EmailsParser.prototype.sortEmails = function (emails) {
                emails.sort(function (a, b) {
                    if (a.date > b.date) {
                        return -1;
                    }
                    else if (a.date < b.date) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
            };
            return EmailsParser;
        })();
        Emails.emailsParserServiceRegistration = [
            'test.common.appSetings',
            EmailsParser
        ];
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=emailsParser.js.map