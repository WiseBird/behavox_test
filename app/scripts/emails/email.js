/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Emails;
    (function (Emails) {
        'use strict';
        var Email = (function () {
            function Email() {
            }
            Email.prototype.fillFromDto = function (dto) {
                this.from = dto.from || "";
                this.to = dto.to || [];
                this.subject = dto.subject || "";
                this.body = dto.body || "";
                this.date = new Date();
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