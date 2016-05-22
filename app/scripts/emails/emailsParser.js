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
                var newDtos = [];
                var lastId = dtos.length;
                dtos.forEach(function (dto) {
                    if (!dto.body) {
                        return;
                    }
                    var messages = dto.body.split(_this.appSetings.parentMessageDelimiter).map(function (x) { return x.trim(); });
                    dto.body = messages[0];
                    var prevDto = dto;
                    for (var i = 1; i < messages.length; i++) {
                        var message = messages[i];
                        var newDto = _this.extractParentEmailFromText(message);
                        newDto.id = lastId + 1;
                        newDto.hasChildren = true;
                        newDtos.push(newDto);
                        prevDto.parentId = newDto.id;
                        prevDto = newDto;
                        lastId++;
                    }
                });
                dtos.push.apply(dtos, newDtos);
            };
            EmailsParser.prototype.extractParentEmailFromText = function (message) {
                var newDto = {};
                var bodyStart = message.indexOf("\n\n");
                if (bodyStart !== -1) {
                    newDto.body = message.substr(bodyStart).trim();
                }
                var headers = message.substring(0, bodyStart).trim();
                var lines = headers.split("\n").map(function (x) { return x.trim(); });
                lines.forEach(function (line) {
                    if (!line) {
                        return;
                    }
                    if (line.indexOf("From:") === 0) {
                        newDto.from = line.substr(5).trim();
                    }
                    else if (line.indexOf("Sent:") === 0) {
                        newDto.date = line.substr(5).trim();
                    }
                    else if (line.indexOf("To:") === 0) {
                        newDto.to = line.substr(3).trim().split(";").map(function (x) { return x.trim(); });
                    }
                    else if (line.indexOf("Cc:") === 0) {
                        newDto.cc = line.substr(3).trim().split(";").map(function (x) { return x.trim(); });
                    }
                    else if (line.indexOf("Bcc:") === 0) {
                        newDto.bcc = line.substr(4).trim().split(";").map(function (x) { return x.trim(); });
                    }
                    else if (line.indexOf("Subject:") === 0) {
                        newDto.subject = line.substr(8).trim();
                    }
                });
                return newDto;
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