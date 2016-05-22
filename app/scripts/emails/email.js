/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var Email = (function () {
            function Email() {
            }
            Email.prototype.getRecipients = function () {
                var result = [];
                result = result.concat(this.to);
                result = result.concat(this.cc);
                result = result.concat(this.bcc);
                // removing duplicates
                return result.filter(function (item, pos) {
                    return result.indexOf(item) == pos;
                });
            };
            Email.prototype.fillFromDto = function (dto) {
                this.id = dto.id;
                this.from = dto.from || "";
                this.to = dto.to || [];
                this.subject = dto.subject || "";
                this.body = dto.body || "";
                this.date = new Date(dto.date);
                this.hasChildren = dto.hasChildren;
                this.parentId = dto.parentId;
                this.cc = dto.cc || [];
                this.bcc = dto.bcc || [];
            };
            Email.fromDTO = function (dto) {
                var entity = new Email();
                entity.fillFromDto(dto);
                return entity;
            };
            return Email;
        })();
        Emails.Email = Email;
    })(Emails = Test.Emails || (Test.Emails = {}));
})(Test || (Test = {}));
//# sourceMappingURL=email.js.map