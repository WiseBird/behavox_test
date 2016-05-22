/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export interface IEmailsParser {
        parse(dtos: IEmailDTO[]): Email[];
    }

    class EmailsParser implements IEmailsParser{
        sendersEmails: {
            [index: string]: IEmailDTO[]
        } = {};

        constructor(private appSetings: Test.Common.IAppSettings) {

        }

        parse (dtos: IEmailDTO[]): Email[] {
            this.setIdsToDtos(dtos);
            this.extractParentEmails(dtos);

            var emails = this.convertDtos(dtos);
            this.sortEmails(emails);

            return emails;
        }
        private setIdsToDtos(dtos: IEmailDTO[]) {
            dtos.forEach((dto, ind) => {
                dto.id = ind + 1;
            });
        }
        private extractParentEmails(dtos: IEmailDTO[]) {
            dtos.forEach((dto) => {
                if(!dto.body) {
                    return;
                }

                var messages = dto.body.split(this.appSetings.parentMessageDelimiter);
                messages.forEach((x) => {
                    x.trim();
                });

                dto.body = messages[0];
                for(let i = 1; i < messages.length; i++) {
                    
                }
            });
        }
        private convertDtos(dtos: IEmailDTO[]): Email[] {
            return dtos.map((x, ind) => Email.fromDTO(x));
        }
        private sortEmails(emails: Email[]) {
            emails.sort((a,b) => {
                if(a.date > b.date) {
                    return -1;
                } else if(a.date < b.date) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    export var emailsParserServiceRegistration = [
        'test.common.appSetings',
        EmailsParser
    ];
}